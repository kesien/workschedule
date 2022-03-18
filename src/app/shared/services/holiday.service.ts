import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HolidayYears } from '../models/allholidayyears.model';
import { Holiday } from '../models/holiday.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  baseUrl = environment.baseApiUrl + 'holidays';
  constructor(private http: HttpClient) {}

  getAllHolidays() {
    return this.http.get<Holiday[]>(this.baseUrl);
  }

  getAllYears() {
    return this.http.get<HolidayYears>(this.baseUrl + "/years");
  }

  getHolidaysByFilter(year: number, month: number, day: number, isFix: boolean) {
    let query = "?";
    if (year) {
      query += "year=" + year;
    }
    if (month) {
      query += "&month=" + month;
    }
    if (day) {
      query += "&day=" + day;
    }
    if (isFix || isFix === false) {
      query += "&type=" + isFix
    } else {
      query += "&type=all"
    }
    return this.http.get<Holiday[]>(this.baseUrl + `/filter${query}`);
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
    return this.http.post<Holiday>(this.baseUrl, holiday);
  }
}
