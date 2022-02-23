import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get(this.baseUrl + `/${year}/${month}`);
  }

  createSchedule(userId: string, year: number, month: number) {
    return this.http.post(this.baseUrl, { userId, year, month });
  }

  deleteSchedule(id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };
    return this.http.delete(this.baseUrl, options);
  }

  updateSchedule(userId: string, id: string, days: Day[]) {
    return this.http.put(this.baseUrl, { userId, id, days });
  }
}
