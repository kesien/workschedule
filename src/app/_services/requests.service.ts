import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../requests/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  baseUrl = environment.baseApiUrl + 'requests';
  constructor(private http: HttpClient) {}

  getRequestsForUser(id: string, year: number, month: number) {
    return this.http.get(
      this.baseUrl + `/user?userid=${id}&year=${year}&month=${month}`
    );
  }

  getAllRequestsForUser(id: string) {
    return this.http.get(this.baseUrl + `/user/${id}`);
  }

  createNewRequest(data: Request) {
    return this.http.post(this.baseUrl, data);
  }

  deleteRequest(id: string | undefined) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
