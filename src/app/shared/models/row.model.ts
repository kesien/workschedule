import { ScheduleDay } from "./scheduleday.model";

export class Row {
    days: ScheduleDay[];
  
    constructor(days: ScheduleDay[]) {
      this.days = days;
    }
  }