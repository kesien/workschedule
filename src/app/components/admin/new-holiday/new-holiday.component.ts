import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Holiday } from 'src/app/shared/models/holiday.model';

@Component({
  selector: 'app-new-holiday',
  templateUrl: './new-holiday.component.html',
  styleUrls: ['./new-holiday.component.css'],
})
export class NewHolidayComponent implements OnInit {
  @Output() onCreateNewHoliday = new EventEmitter();
  holiday: {
    date: Date;
    isFix: boolean;
  } = {
    date: new Date(),
    isFix: false,
  };
  constructor(private ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.holiday = {
      date: new Date(),
      isFix: false,
    };
  }

  createNewHoliday() {
    const newHoliday: Partial<Holiday> = {
      day: this.holiday.date.getDate(),
      month: this.holiday.date.getMonth() + 1,
      year: this.holiday.date.getFullYear(),
      isFix: this.holiday.isFix
    };
    this.onCreateNewHoliday.emit(newHoliday);
  }

  save() {
    const newHoliday: Partial<Holiday> = {
      day: this.holiday.date.getDate(),
      month: this.holiday.date.getMonth() + 1,
      year: this.holiday.date.getFullYear(),
      isFix: this.holiday.isFix
    };
    this.ref.close(newHoliday);
  }

  close() {}
}
