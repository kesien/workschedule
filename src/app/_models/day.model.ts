import { User } from './user.model';

export interface Day {
  date: Date;
  isHoliday: boolean;
  isWeekend: boolean;
  usersScheduledForMorning: User[];
  usersScheduledForForenoon: User[];
  usersOnHoliday: User[];
}
