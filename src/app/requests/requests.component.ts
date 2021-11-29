import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../_services/requests.service';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { Request } from './request.model';
import { ThrowStmt } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  date = new Date();
  filter = {
    userId: '',
    year: this.date.getFullYear(),
    month: this.date.getMonth() + 1,
  };
  model: Request = {
    date: '',
    type: 0,
  };
  createMode = false;

  years: any[] = [];
  months: string[] = [
    'Január',
    'Február',
    'Mácrius',
    'Április',
    'Május',
    'Június',
    'Július',
    'Augusztus',
    'Szeptember',
    'Október',
    'November',
    'December',
  ];

  allRequests: Request[] = [];
  constructor(
    private authService: AuthService,
    private requestsService: RequestsService,
    private alertService: AlertService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.userId = this.authService.decodedToken.nameid;
    this.getAllRequestsForUser();
  }

  createRequest() {
    this.requestsService.createNewRequest(this.model).subscribe(
      (response) => {
        this.alertService.success('Sikeres küldés!');
        this.allRequests.push(response as Request);
      },
      (error) => this.alertService.error(error),
      () => {
        this.getAllRequestsForUser();
        this.cancel(false);
      }
    );
  }

  cancel(cancelCreateMode: boolean) {
    this.createMode = cancelCreateMode;
  }

  getAllRequestsForUser() {
    this.ngxSpinner.show();
    this.requestsService
      .getRequestsForUser(
        this.filter.userId,
        this.filter.year,
        this.filter.month
      )
      .subscribe(
        (response) => {
          this.allRequests = response as Request[];

          this.allRequests.forEach((request) => {
            const year = this.getYear(request.date);

            if (this.years.indexOf(year) < 0) {
              this.years.push(year);
            }
          });
        },
        (error) => {
          this.alertService.error(error);
        },
        () => this.ngxSpinner.hide()
      );
  }

  deleteRequest(request: Request) {
    this.requestsService.deleteRequest(request.id).subscribe(
      () => {
        this.alertService.success('Sikeres törlés!');
        this.allRequests = this.allRequests.filter((req) => req !== request);
      },
      (error) => this.alertService.error(error)
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
