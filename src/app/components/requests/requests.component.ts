import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../../shared/services/requests.service';
import { AlertService } from '../../shared/services/alert.service';
import { Request } from '../../shared/models/request.model';
import { AuthService } from '../../shared/services/auth.service';
import { months } from 'src/app/shared/constants/months.data';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewRequestComponent } from './new-request/new-request.component';
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [DialogService]
})
export class RequestsComponent implements OnInit, OnDestroy {
  ref!: DynamicDialogRef;
  @ViewChild('dt1') dt: Table | undefined;
  isOpened = false;
  displayModal: boolean = false;
  requestTypes = REQUEST_TYPES;
  date = new Date();
  filter = {
    userId: '',
    year: this.date.getFullYear(),
    month: this.date.getMonth(),
  };
  createMode = false;
  years: number[] = [];
  months = months;
  allRequests: Request[] = [];

  constructor(
    private authService: AuthService,
    private requestsService: RequestsService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.filter.userId = this.authService.decodedToken.nameid;
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
      style: {'max-width': '500px'},
      baseZIndex: 10000,
      data: {
        userId: this.authService.decodedToken.nameid
      }
    });

    this.ref.onClose.subscribe((request: Request) =>{
      this.isOpened = false;
      if (request) {
        this.getAllRequestYearsForUser();
        this.getAllRequestsForUser();
        this.alertService.success("Sikeresen hozzáadva!")
      }
    });
  }

  cancel(cancelCreateMode: boolean) {
    this.createMode = cancelCreateMode;
  }

  filterRequests() {
    this.requestsService
      .getRequestsForUser(
        this.filter.userId,
        this.filter.year,
        this.filter.month
      )
      .subscribe(
        (response) => {
          this.allRequests = response;
        },
        (error) => {
          this.alertService.error(error);
        }
      );
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
      error => {
        for (let message of error.Messages) {
          this.alertService.error(message);
        }
      }
    );
  }

  getAllRequestsForUser() {
    this.requestsService.getAllRequestsForUser(this.filter.userId).subscribe(
      (response) => {
        this.allRequests = response;
        console.log(this.allRequests);
        
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }

  filteredRequests() {
    return this.allRequests.filter(
      (request) => this.getYear(request.date.toString()) == this.filter.year
    );
  }

  deleteRequest(request: Request) {
    this.requestsService.deleteRequest(request.id).subscribe(
      () => {
        this.alertService.success('Sikeres törlés!');
        this.allRequests = this.allRequests.filter((req) => req !== request);
      },
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message);
        }
      },
      () => {
        this.getAllRequestYearsForUser();
      }
    );
  }

  private getYear(date: string) {
    const dateFromString = new Date(date);
    return dateFromString.getFullYear();
  }

  getType(type: number) {
    if (type === 0) {
      return '8:00';
    } else if (type === 1) {
      return '9:30';
    }
    return 'Szabadság';
  }

  isCurrentMonth(monthIndex: number) {
    return this.date.getMonth() === monthIndex;
  }
}
