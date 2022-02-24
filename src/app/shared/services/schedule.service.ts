import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../models/day.model';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  baseUrl = environment.baseApiUrl + 'schedules';
  constructor(private http: HttpClient) {}

  getSchedule(year: number, month: number): Observable<Schedule> {
    return this.http.get(this.baseUrl + `/${year}/${month}`) as Observable<Schedule>;
  }

  createSchedule(userId: string, year: number, month: number): Observable<Schedule> {
    return this.http.post(this.baseUrl, { userId, year, month }) as Observable<Schedule>;
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

  updateSchedule(userId: string, id: string, days: Day[]): Observable<Schedule> {
    return this.http.put(this.baseUrl, { userId, id, days }) as Observable<Schedule>;
  }
}
