import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Day } from '../_models/day.model';
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

  createSchedule(year: number, month: number) {
    return this.http.post(this.baseUrl, { year, month });
  }

  deleteSchedule(id: string) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }

  updateSchedule(id: string, days: Day[]) {
    return this.http.put(this.baseUrl + `/${id}`, days);
  }
}
