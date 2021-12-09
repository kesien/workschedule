import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from 'src/app/_models/day.model';
import { ScheduleDay } from '../row.model';

@Component({
  selector: 'app-schedule-row',
  templateUrl: './schedule-row.component.html',
  styleUrls: ['./schedule-row.component.css'],
})
export class ScheduleRowComponent implements OnInit {
  @Input() days!: ScheduleDay[];
  @Input() editMode = false;
  @Input() mobile = false;
  @Output() arrowClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  arrowClicked(day: Day) {
    this.arrowClick.emit(day);
  }

  shouldDisplay(day: Day | null) {
    if (this.mobile) {
      if (day == null || day.isWeekend) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
}
