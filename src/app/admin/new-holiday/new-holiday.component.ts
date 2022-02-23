import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Holiday } from 'src/app/_models/holiday.model';

@Component({
  selector: 'app-new-holiday',
  templateUrl: './new-holiday.component.html',
  styleUrls: ['./new-holiday.component.css'],
})
export class NewHolidayComponent implements OnInit {
  @Output() onCancelNewHolidayMode = new EventEmitter();
  @Output() onCreateNewHoliday = new EventEmitter();
  holiday: {
    date: Date;
    isFix: boolean;
  } = {
    date: new Date(),
    isFix: false,
  };
  constructor() {}

  ngOnInit(): void {
    this.holiday = {
      date: new Date(),
      isFix: false,
    };
  }

  cancel() {
    this.onCancelNewHolidayMode.emit(true);
  }

  createNewHoliday() {
    const date = new Date(this.holiday.date);

    const newHoliday: Partial<Holiday> = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isFix: this.holiday.isFix
    };
    this.onCreateNewHoliday.emit(newHoliday);
  }
}
