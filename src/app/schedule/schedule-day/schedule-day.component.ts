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
      this.day.day.usersScheduledForMorning =
        this.day.day.usersScheduledForMorning.filter(
          (schedule) => schedule.userId !== user.userId
        );
      this.day.day.usersScheduledForForenoon.push(user);
    }
  }

  upArrowClicked(user: User) {
    if (this.day.day) {
      this.day.day.usersScheduledForForenoon =
        this.day.day.usersScheduledForForenoon.filter(
          (schedule) => schedule.userId !== user.userId
        );
      this.day.day.usersScheduledForMorning.push(user);
    }
  }
}
