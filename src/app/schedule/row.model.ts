import { Day } from '../_models/day.model';

export enum DayType {
  EMPTY,
  NORMAL,
  WEEKEND,
}

export class ScheduleDay {
  type: DayType;
  day: Day | null;

  constructor(type: DayType, day: Day | null = null) {
    this.type = type;
    this.day = day;
  }
}

export class Row {
  days: ScheduleDay[];

  constructor(days: ScheduleDay[]) {
    this.days = days;
  }
}
