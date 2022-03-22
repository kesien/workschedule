import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../shared/services/requests.service';
import { AlertService } from '../../shared/services/alert.service';
import { Request } from '../../shared/models/request.model';
import { AuthService } from '../../shared/services/auth.service';
import { months } from 'src/app/shared/constants/months.data';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewRequestComponent } from './new-request/new-request.component';
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [DialogService]
})
export class RequestsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(Table) 
  datatable?: Table | null;

  ref!: DynamicDialogRef;
  isOpened = false;
  displayModal: boolean = false;
  requestTypes = REQUEST_TYPES;
  date = new Date();
  years: number[] = [];
  months = months;
  allRequests: Request[] = [];
  totalRecords = 0;

  filters = {};

  private connection?: signalR.HubConnection;

  constructor(
    private authService: AuthService,
    private requestsService: RequestsService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) { }

  ngAfterViewInit(): void {
    if (this.datatable) {
      this.datatable.filters = this.filters;
      this.datatable._filter();
    }
  }
  ngOnInit(): void {
    this.getAllRequestYearsForUser();
    this.getAllRequestsForUser();

    this.filters = {
      "year": [{ "value": this.years[0].toString(), "matchMode": "equals" }] as FilterMetadata,
      "month": [{ "value": this.months[this.date.getMonth()].value, "matchMode": "equals" }] as FilterMetadata,
      "type": [{ "value": '', "matchMode": "equals" }] as FilterMetadata,
    }

    this.connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(environment.signalRUrl)  
      .build();  
  
    this.connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    this.connection.on("RequestCreatedEvent", () => {  
      this.getAllRequestsForUser();  
      this.getAllRequestYearsForUser();  
    });

    this.connection.on("RequestDeletedEvent", () => {  
      this.getAllRequestsForUser();  
      this.getAllRequestYearsForUser();  
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  showModalDialog() {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    this.ref = this.dialogService.open(NewRequestComponent, {
      header: this.translate.instant('requests.new-request.title'),
      style: { 'max-width': '500px' },
      baseZIndex: 10000,
      data: {
        userId: this.authService.decodedToken.nameid
      }
    });

    this.ref.onClose.subscribe(
      (request: Request) => {
        this.isOpened = false;
        if (request) {
          this.alertService.success(this.translate.instant('requests.new-request.success-message'))
        }
      },
      error => this.alertService.error(error)
    );
  }

  getAllRequestYearsForUser() {
    this.years = [this.date.getFullYear()];
    this.requestsService.getAllRequestYearsForUser(this.authService.decodedToken.nameid).subscribe(
      response => {
        for (let year of response.years) {
          if (!this.years.includes(year)) {
            this.years.push(year);
          }
        }
      },
      error => this.alertService.error(error.message)
    );
  }

  getAllRequestsForUser() {
    this.requestsService.getAllRequestsForUser(this.authService.decodedToken.nameid).subscribe(
      (response) => {
        this.allRequests = response;
        this.totalRecords = response.length;
      },
      error => this.alertService.error(error.message)
    );
  }

  deleteRequest(request: Request) {
    this.requestsService.deleteRequest(request.id).subscribe(
      () => this.alertService.success(this.translate.instant('requests.delete-success')),
      error => this.alertService.error(error.message)
    );
  }

  getType(type: number) {
    if (type === 0) {
      return this.translate.instant('requests.types.eight');
    } else if (type === 1) {
      return this.translate.instant('requests.types.halften');;
    }
    return this.translate.instant('requests.types.holiday');
  }
}