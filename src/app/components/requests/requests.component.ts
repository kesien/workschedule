import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../shared/services/requests.service';
import { AlertService } from '../../shared/services/alert.service';
import { Request } from '../../shared/models/request.model';
import { AuthService } from '../../shared/services/auth.service';
import { months } from 'src/app/shared/constants/months.data';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewRequestComponent } from './new-request/new-request.component';
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant';
import { IsLoadingService } from 'src/app/shared/services/isloading.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [DialogService]
})
export class RequestsComponent implements OnInit, OnDestroy {
  ref!: DynamicDialogRef;
  isOpened = false;
  displayModal: boolean = false;
  requestTypes = REQUEST_TYPES;
  date = new Date();
  years: number[] = [];
  months = months;
  allRequests: Request[] = [];
  totalRecords = 0;

  constructor(
    private authService: AuthService,
    private requestsService: RequestsService,
    private alertService: AlertService,
    private dialogService: DialogService,
    public isLoading: IsLoadingService
  ) { }

  ngOnInit(): void {
    this.getAllRequestYearsForUser();
    this.getAllRequestsForUser();
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
      header: 'Új kérés',
      style: { 'max-width': '500px' },
      baseZIndex: 10000,
      data: {
        userId: this.authService.decodedToken.nameid
      }
    });

    this.ref.onClose.subscribe((request: Request) => {
      this.isOpened = false;
      if (request) {
        this.getAllRequestYearsForUser();
        this.getAllRequestsForUser();
        this.alertService.success("Sikeresen hozzáadva!")
      }
    });
  }

  getAllRequestYearsForUser() {
    this.years = [this.date.getFullYear()];
    this.requestsService.getAllRequestYearsForUser(this.authService.decodedToken.nameid).subscribe(
      response => {
        for (let year of response.years) {
          if (this.years.indexOf(year) < 0) {
            this.years.push(year);
          }
        }
      },
    );
  }

  getAllRequestsForUser() {
    this.requestsService.getAllRequestsForUser(this.authService.decodedToken.nameid).subscribe(
      (response) => {
        this.allRequests = response;
        this.totalRecords = response.length;
      },
    );
  }

  deleteRequest(request: Request) {
    this.requestsService.deleteRequest(request.id).subscribe(
      () => {
        this.alertService.success('Sikeres törlés!');
        this.allRequests = this.allRequests.filter((req) => req !== request);
      },
      () => {
        this.getAllRequestYearsForUser();
      }
    );
  }

  getType(type: number) {
    if (type === 0) {
      return '8:00';
    } else if (type === 1) {
      return '9:30';
    }
    return 'Szabadság';
  }
}
