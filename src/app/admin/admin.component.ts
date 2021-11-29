import { Component, OnInit } from '@angular/core';
import { Holiday } from '../_models/holiday.model';
import { User } from '../_models/user.model';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { HolidayService } from '../_services/holiday.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users?: User[];
  holidays?: Holiday[];
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
      (error) => this.alertService.error(error)
    );
  }

  getHolidays() {
    this.holidayService.getAllHolidays().subscribe(
      (response) => (this.holidays = response as Holiday[]),
      (error) => this.alertService.error(error)
    );
  }

  deleteHoliday(holiday: Holiday) {
    if (holiday.id) {
      this.holidayService.delete(holiday.id).subscribe(
        (response) => {
          this.alertService.success('Sikeres törlés!');
          this.holidays = this.holidays?.filter((h) => h != holiday);
        },
        (error) => this.alertService.error(error)
      );
    }
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.userId).subscribe(
      (response) => {
        this.alertService.success('Sikeres törlés!');
        this.users = this.users?.filter((u) => u != user);
      },
      (error) => this.alertService.error(error)
    );
  }
}
