import { Component, HostListener, OnInit } from '@angular/core';
import { Day } from '../_models/day.model';
import { Schedule } from '../_models/schedule.model';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { ScheduleService } from '../_services/schedule.service';
import { months } from '../_shared/months.data';
import { DayType, Row, ScheduleDay } from './row.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth() + 1;
  schedule!: Schedule;
  rows: Row[] = [];
  years = Array(10)
    .fill(2021)
    .map((x, y) => x + y);
  editMode = false;
  changes: Day[] = [];
  mobile = false;
  months = months;

  constructor(
    private alertService: AlertService,
    private scheduleService: ScheduleService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSchedule();
    if (window.screen.width <= 650) {
      this.mobile = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 650) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  getSchedule() {
    this.scheduleService.getSchedule(this.year, this.month).subscribe(
      (response) => {
        this.schedule = response as Schedule;
      },
      (error) => this.alertService.error(error),
      () => {
        this.generateRows();
      }
    );
  }

  createSchedule() {
    this.scheduleService.createSchedule(this.year, this.month).subscribe(
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
          (error) => this.alertService.error(error),
          () => this.getSchedule()
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
        .updateSchedule(this.schedule.id, this.changes)
        .subscribe(
          (response) => {
            this.schedule = response as Schedule;

            this.alertService.success('Sikeres frissítés!');
          },
          (error) => this.alertService.error(error),
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
    this.getSchedule();
  }
}
