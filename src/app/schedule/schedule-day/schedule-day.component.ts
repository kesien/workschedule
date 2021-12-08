import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { ScheduleDay } from '../row.model';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.css'],
})
export class ScheduleDayComponent implements OnInit {
  @Input() day!: ScheduleDay;
  @Input() editMode!: boolean;
  @Output() arrowClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  downArrowClicked(user: User) {
    if (this.day.day) {
      const index = this.day.day.usersScheduledForMorning.indexOf(user);
      this.day.day.usersScheduledForMorning.splice(index, 1);
      this.day.day.usersScheduledForForenoon.push(user);
    }
    this.arrowClick.emit(this.day.day);
  }

  upArrowClicked(user: User) {
    if (this.day.day) {
      const index = this.day.day.usersScheduledForForenoon.indexOf(user);
      this.day.day.usersScheduledForForenoon.splice(index, 1);
      this.day.day.usersScheduledForMorning.push(user);
    }
    this.arrowClick.emit(this.day.day);
  }
}
