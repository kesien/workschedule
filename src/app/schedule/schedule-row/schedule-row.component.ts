import { Component, Input, OnInit } from '@angular/core';
import { ScheduleDay } from '../row.model';

@Component({
  selector: 'app-schedule-row',
  templateUrl: './schedule-row.component.html',
  styleUrls: ['./schedule-row.component.css'],
})
export class ScheduleRowComponent implements OnInit {
  @Input() days?: ScheduleDay[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.days);
  }
}
