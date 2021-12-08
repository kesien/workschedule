import { HttpClient } from '@angular/common/http';
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
    return this.http.delete(this.baseUrl + `/${id}`);
  }

  createNewHoliday(holiday: Holiday) {
    return this.http.post(this.baseUrl, holiday);
  }
}
