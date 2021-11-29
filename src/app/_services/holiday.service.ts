import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  baseUrl = environment.baseApiUrl + 'holidays';
  constructor(private http: HttpClient) {}

  getAllHolidays() {
    return this.http.get(this.baseUrl);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
