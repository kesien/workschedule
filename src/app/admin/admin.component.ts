import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Holiday } from '../_models/holiday.model';
import { User } from '../_models/user.model';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { HolidayService } from '../_services/holiday.service';
import { UserService } from '../_services/user.service';
import { months } from '../_shared/months.data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users?: User[];
  selectedUser?: User;
  holidays?: Holiday[];
  months = months;
  createNewUserMode = false;
  createNewHolidayMode = false;
  editUserMode = false;
  date = new Date();
  filter = {
    year: 0,
    month: 0,
  };
  years: number[] = [];

  constructor(
    private usersService: UserService,
    private alertService: AlertService,
    private holidayService: HolidayService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getHolidays();
  }

  getUsers() {
    this.usersService.getAllUser().subscribe(
      (response) => (this.users = response as User[]),
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message)
        }
      }
    );
  }

  getHolidays() {
    this.holidayService.getAllHolidays().subscribe(
      (response) => {
        this.holidays = response as Holiday[];
      },
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message)
        }
      },
      () => this.populateYears()
    );
  }

  filterHolidays() {
    this.holidayService
      .getHolidaysByFilter(this.filter.year, this.filter.month)
      .subscribe(
        (response) => (this.holidays = response as Holiday[]),
        (error) => {
          for (let message of error.Message) {
            this.alertService.error(message)
          }
        }
      );
  }

  deleteHoliday(holiday: Holiday) {
    if (confirm(`Biztos, hogy törlöd ezt az ünnepet?`)) {
      if (holiday.id) {
        this.holidayService.delete(holiday.id).subscribe(
          (response) => {
            this.alertService.success('Sikeres törlés!');
            this.holidays = this.holidays?.filter((h) => h != holiday);
          },
          (error) => {
            for (let message of error.Message) {
              this.alertService.error(message)
            }
          },
          () => {
            this.populateYears();
          }
        );
      }
    }
  }

  deleteUser(user: User) {
    if (confirm('Biztos, hogy törlöd a ' + user.userName + ' felhasználót?')) {
      this.usersService.deleteUser(user.id).subscribe(
        (response) => {
          this.alertService.success('Sikeres törlés!');
          this.users = this.users?.filter((u) => u != user);
        },
        (error) => {
          for (let message of error.Messages) {
            this.alertService.error(message);
          }
        }
      );
    }
  }

  createNewUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (response) => {
        this.alertService.success('Új felhasználó létrehozva!');
        this.users?.push(response as User);
      },
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message)
        }
      },
      () => this.cancel()
    );
  }

  createNewHoliday(holiday: Holiday) {
    this.holidayService.createNewHoliday(holiday).subscribe(
      (response) => {
        this.alertService.success('Új ünnep hozzáadva!');
        this.holidays?.push(response as Holiday);
      },
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message);
        }
      },
      () => {
        this.cancel();
        this.populateYears();
      }
    );
  }

  populateYears() {
    this.years = [];
    this.holidays?.forEach((holiday) => {
      if (holiday.year) {
        if (this.years.indexOf(holiday.year) < 0) {
          this.years.push(holiday.year);
        }
      }
    });
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.editUserMode = true;
  }

  saveEditChanges(user: User) {
    this.usersService.updateUser(this.authService.decodedToken.nameid, user).subscribe(
      (response) => this.alertService.success('Sikeres frissítés!'),
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message)
        }
      },
      () => this.cancel()
    );
  }

  cancel() {
    this.editUserMode = false;
    this.createNewUserMode = false;
    this.createNewHolidayMode = false;
  }
}
