import { Day } from './day.model';
import { Summary } from './summary.model';

export interface Schedule {
  year: number;
  month: number;
  days: Day[];
  summaries: Summary[];
  numOfWorkDay: number;
}
