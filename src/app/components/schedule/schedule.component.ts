import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Day } from '../../shared/models/day.model';
import { Schedule } from '../../shared/models/schedule.model';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { ScheduleService } from '../../shared/services/schedule.service';
import { months } from 'src/app/shared/constants/months.data';
import { DayType } from 'src/app/shared/constants/daytype.constant';
import { Row } from 'src/app/shared/models/row.model';
import { ScheduleDay } from 'src/app/shared/models/scheduleday.model';
import { IsLoadingService } from 'src/app/shared/services/isloading.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  date = new Date();
  fileUrl = environment.baseApiUrl + 'files/';
  schedule!: Schedule;
  rows: Row[] = [];
  editMode = false;
  changes: Day[] = [];
  yearRange: string;
  filter: Date = new Date();
  mobile = false;
  constructor(
    private alertService: AlertService,
    private scheduleService: ScheduleService,
    public authService: AuthService,
    public isLoading: IsLoadingService
  ) {
    this.yearRange = `${new Date().getFullYear() - 6}:${new Date().getFullYear() + 10}`;
  }

  ngOnInit(): void {
    this.getSchedule(this.filter.getFullYear(), this.filter.getMonth() + 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 650) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  getSchedule(year: number = this.filter.getFullYear(), month: number = this.filter.getMonth() + 1) {
    this.scheduleService.getSchedule(year, month).subscribe(
      (response) => {
        this.schedule = response as Schedule;
      },
      (error) => {
        for (let message of error.Messages) {
          this.alertService.error(message);
        }
      },
      () => {
        this.generateRows();
      }
    );
  }

  createSchedule() {
    this.scheduleService.createSchedule(this.authService.decodedToken.nameid, this.filter.getFullYear(), this.filter.getMonth() + 1).subscribe(
      (response) => {
        this.schedule = response as Schedule;
      },
      (error) => {
        this.alertService.error(error);
      },
      () => {
        this.generateRows();
      }
    );
  }

  deleteSchedule() {
    if (confirm(`Biztos, hogy törlöd ezt a beosztást?`)) {
      if (this.schedule.id) {
        this.scheduleService.deleteSchedule(this.schedule.id).subscribe(
          (response) => this.alertService.success('Sikeres törlés!'),
          (error) => {
            for (let message of error.Messages) {
              this.alertService.error(message);
            }
          },
          () => this.getSchedule(this.filter.getFullYear(), this.filter.getMonth() + 1)
        );
      }
    }
  }

  getDay(date: Date) {
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  enableEditMode() {
    this.editMode = true;
  }

  generateRows() {
    const rows: Row[] = [];
    let days: ScheduleDay[] = [];
    const parsedDateFromSchedule = new Date(this.schedule.days[0].date);
    const date = new Date(
      parsedDateFromSchedule.getFullYear(),
      parsedDateFromSchedule.getMonth()
    );
    if (!rows.length) {
      for (let i = 0; i < this.getDay(date); i++) {
        days.push(new ScheduleDay(DayType.EMPTY));
      }
    }
    let index = 0;
    while (date.getMonth() == parsedDateFromSchedule.getMonth()) {
      const type = this.schedule.days[index].isWeekend
        ? DayType.WEEKEND
        : DayType.NORMAL;
      days.push(new ScheduleDay(type, this.schedule.days[index]));
      if (days.length === 7) {
        rows.push(new Row(days));
        days = [];
      }
      index++;
      date.setDate(date.getDate() + 1);
    }
    if (days.length > 0 && days.length !== 7) {
      while (days.length !== 7) {
        days.push(new ScheduleDay(DayType.EMPTY));
      }
      rows.push(new Row(days));
    }
    this.rows = rows;
  }

  dayChanged(day: Day) {
    if (this.changes.indexOf(day) < 0) {
      this.changes.push(day);
    }
  }

  saveChanges() {
    if (this.changes.length && this.schedule.id) {
      this.scheduleService
        .updateSchedule(this.authService.decodedToken.nameid, this.schedule.id, this.changes)
        .subscribe(
          (response) => {
            this.schedule = response as Schedule;

            this.alertService.success('Sikeres frissítés!');
          },
          (error) => {
            for (let message of error.Messages) {
              this.alertService.error(message);
            }
          },
          () => {
            this.editMode = false;
            this.changes = [];
          }
        );
    } else {
      this.editMode = false;
    }
  }

  cancel() {
    this.editMode = false;
    this.getSchedule(this.filter.getFullYear(), this.filter.getMonth() + 1);
  }
}
