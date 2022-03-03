import { Component, OnDestroy, OnInit } from '@angular/core';
import { Holiday } from '../../shared/models/holiday.model';
import { User } from '../../shared/models/user.model';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { HolidayService } from '../../shared/services/holiday.service';
import { UserService } from '../../shared/services/user.service';
import { months } from '../../shared/constants/months.data';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewUserComponent } from './new-user/new-user.component';
import { NewHolidayComponent } from './new-holiday/new-holiday.component';
import { IsLoadingService } from '../../shared/services/isloading.service';
import { HolidayYears } from '../../shared/models/allholidayyears.model';
import { EditUserComponent } from './edit-user/edit-user.component';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DialogService]
})
export class AdminComponent implements OnInit, OnDestroy {
  ref!: DynamicDialogRef;
  isOpened = false;
  users: User[] = [];
  selectedUser?: User;
  holidays: Holiday[] = [];
  years!: HolidayYears;
  options: { label: string, value: number }[] = []
  months = months;
  createNewUserMode = false;
  createNewHolidayMode = false;
  editUserMode = false;
  date = new Date();
  filter = {
    year: 0,
    month: 0,
  };
  private connection?: signalR.HubConnection;

  constructor(
    private usersService: UserService,
    private alertService: AlertService,
    private holidayService: HolidayService,
    private dialogService: DialogService,
    public authService: AuthService,
    public isLoading: IsLoadingService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getHolidayYears();
    this.getHolidays();

    this.connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(environment.signalRUrl)  
      .build();  
  
    this.connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    this.connection.on("UserCreatedEvent", () => {  
      this.getUsers();  
    });

    this.connection.on("UserDeletedEvent", () => {  
      this.getUsers();  
    });

    this.connection.on("UserUpdatedEvent", () => {  
      this.getUsers();  
    });

    this.connection.on("HolidayCreatedEvent", () => {  
      this.getHolidays(); 
      this.getHolidayYears(); 
    });

    this.connection.on("HolidayDeletedEvent", () => {  
      this.getHolidays(); 
      this.getHolidayYears(); 
    });
  }

  ngOnDestroy(): void {
    if (this.connection) {
      this.connection.stop();
    }
    if (this.ref) {
      this.ref.close();
    }
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
        this.holidays = response;
      },
    );
  }

  getHolidayYears() {
    this.holidayService.getAllYears().subscribe(
      (response) => {
        this.years = response;
        this.getOptions();
      }
    )
  }

  getOptions() {
    this.options = [];
    this.years.years.forEach(year => {
      this.options.push(
        { label: year == 0 ? "---" : year.toString(), value: year }
      )
    });
  }

  deleteHoliday(holiday: Holiday) {
    if (holiday.id) {
      this.holidayService.delete(holiday.id).subscribe(
        (response) => {
          this.alertService.success('Sikeres törlés!');
        },
      );
    }
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id).subscribe(
      (response) => {
        this.alertService.success('Sikeres törlés!');
      })
  }

  showNewUserDialog() {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    this.ref = this.dialogService.open(NewUserComponent, {
      header: 'Új felhasználó hozzáadása',
      style: { 'max-width': '500px' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((user: User) => {
      this.isOpened = false;
      if (user) {
        this.createNewUser(user);
      }
    });
  }

  showNewHolidayDialog() {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    this.ref = this.dialogService.open(NewHolidayComponent, {
      header: 'Új ünnepnap hozzáadása',
      style: { 'max-width': '500px' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((holiday: Holiday) => {
      this.isOpened = false;
      if (holiday) {
        this.createNewHoliday(holiday);
      }
    });
  }

  showEditUserDialog(user: User) {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    this.ref = this.dialogService.open(EditUserComponent, {
      header: 'Felhasználó szerkesztése',
      style: { 'max-width': '500px' },
      baseZIndex: 10000,
      data: {
        user: {...user}
      }
    });

    this.ref.onClose.subscribe((user: User) => {
      this.isOpened = false;
      if (user) {
        this.saveEditChanges(user);
      }
    })
  }

  createNewUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (response) => {
        this.alertService.success('Új felhasználó létrehozva!');
      },
    );
  }

  createNewHoliday(holiday: Holiday) {
    this.holidayService.createNewHoliday(holiday).subscribe(
      (response) => {
        this.alertService.success('Új ünnep hozzáadva!');
      },
    );
  }

  editUser(user: User) {
    this.showEditUserDialog(user);
  }

  saveEditChanges(user: User) {
    this.usersService.updateUser(this.authService.decodedToken.nameid, user).subscribe(
      (response) => {
        this.alertService.success('Sikeres frissítés!')
        this.getUsers();
      },
    );
  }
}
