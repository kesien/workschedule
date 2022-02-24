import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { months } from 'src/app/shared/constants/months.data';
import { Holiday } from 'src/app/shared/models/holiday.model';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
})
export class HolidaysComponent implements OnInit {
  @Input() holidays?: Holiday[];
  @Input() filter?: any;
  @Input() years: number[] = [];
  @Output() onDeleteHoliday = new EventEmitter();
  @Output() onFilterChanged = new EventEmitter();

  date = new Date();
  months = months;
  constructor() {}

  ngOnInit(): void {}

  deleteHoliday(holiday: Holiday) {
    this.filter.year = 0;
    this.onDeleteHoliday.emit(holiday);
  }

  filterHolidays() {
    this.onFilterChanged.emit(true);
  }

  filteredHolidays() {
    if (this.filter.year !== 0) {
      return this.holidays?.filter(
        (holiday) => holiday.year === this.filter.year
      );
    }
    return this.holidays?.filter((holiday) => !holiday.year);
  }
}
