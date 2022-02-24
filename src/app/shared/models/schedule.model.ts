import { Day } from './day.model';
import { Summary } from './summary.model';
import { WordFile } from './wordfile.model';

export interface Schedule {
  id?: string;
  year: number;
  month: number;
  days: Day[];
  summaries: Summary[];
  numOfWorkDay: number;
  isSaved: boolean;
  wordFile?: WordFile;
}
