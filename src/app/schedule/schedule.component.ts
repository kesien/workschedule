import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Day } from '../_models/day.model';
import { Schedule } from '../_models/schedule.model';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { ScheduleService } from '../_services/schedule.service';
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
    private alertService: AlertService,
    private scheduleService: ScheduleService,
    private ngxSpinner: NgxSpinnerService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule() {
    this.ngxSpinner.show();
    this.scheduleService.getSchedule(this.year, this.month).subscribe(
      (response) => {
        this.schedule = response as Schedule;
      },
      (error) => this.alertService.error(error),
      () => {
        this.generateRows();
        this.ngxSpinner.hide();
      }
    );
  }

  createSchedule() {
    this.ngxSpinner.show();
    this.scheduleService.createSchedule(this.schedule).subscribe(
      (response) => {
        this.schedule = response as Schedule;
      },
      (error) => {
        this.alertService.error(error);
        this.ngxSpinner.hide();
      },
      () => {
        this.generateRows();
        this.ngxSpinner.hide();
      }
    );
  }

  getDay(date: Date) {
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
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
}
