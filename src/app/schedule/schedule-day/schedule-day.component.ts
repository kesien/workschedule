import { Component, Input, OnInit } from '@angular/core';
import { ScheduleDay } from '../row.model';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.css'],
})
export class ScheduleDayComponent implements OnInit {
  @Input() day!: ScheduleDay;

  constructor() {}

  ngOnInit(): void {}
}
