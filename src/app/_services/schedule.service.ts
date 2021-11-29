import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Schedule } from '../_models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  baseUrl = environment.baseApiUrl + 'schedules';
  constructor(private http: HttpClient) {}

  getSchedule(year: number, month: number) {
    return this.http.get(this.baseUrl + `?year=${year}&month=${month}`);
  }

  createSchedule(schedule: Schedule) {
    return this.http.post(this.baseUrl, schedule);
  }
}
