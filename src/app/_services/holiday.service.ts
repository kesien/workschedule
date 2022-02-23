import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../_models/holiday.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  baseUrl = environment.baseApiUrl + 'holidays';
  constructor(private http: HttpClient) {}

  getAllHolidays() {
    return this.http.get(this.baseUrl);
  }

  getHolidaysByFilter(year: number, month: number) {
    return this.http.get(this.baseUrl + `/filter?year=${year}&month=${month}`);
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

  createNewHoliday(holiday: Holiday) {
    const payload = { isFix: holiday.isFix, date: new Date(holiday.year, holiday.month - 1, holiday.day) }
    return this.http.post(this.baseUrl, payload);
  }
}
