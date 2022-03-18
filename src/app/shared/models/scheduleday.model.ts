import { DayType } from "../constants/daytype.constant";
import { Day } from "./day.model";

export class ScheduleDay {
    type: DayType;
    day: Day | null;
  
    constructor(type: DayType, day: Day | null = null) {
      this.type = type;
      this.day = day;
    }
  }