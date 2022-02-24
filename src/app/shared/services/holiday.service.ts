import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  baseUrl = environment.baseApiUrl + 'holidays';
  constructor(private http: HttpClient) {}

  getAllHolidays(): Observable<Holiday[]> {
    return this.http.get(this.baseUrl) as Observable<Holiday[]>;
  }

  getHolidaysByFilter(year: number, month: number): Observable<Holiday[]> {
    return this.http.get(this.baseUrl + `/filter?year=${year}&month=${month}`) as Observable<Holiday[]>;
  }

  delete(id: string) {
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

  createNewHoliday(holiday: Holiday): Observable<Holiday> {
    const payload = { isFix: holiday.isFix, date: new Date(holiday.year, holiday.month - 1, holiday.day) }
    return this.http.post(this.baseUrl, payload) as Observable<Holiday>;
  }
}
