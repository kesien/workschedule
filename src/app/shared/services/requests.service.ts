import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../models/request.model';
import { Years } from '../models/years.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  baseUrl = environment.baseApiUrl + 'requests';
  constructor(private http: HttpClient) {}

  getRequestsForUser(userId: string, year: number, month: number) {
    return this.http.get<Request[]>(
      this.baseUrl + `/${userId}/${year}/${month}`
    );
  }

  getAllRequestYearsForUser(userId: string) {
    return this.http.get<Years>(this.baseUrl + `/years/${userId}`)
  }

  getAllRequestsForUser(userId: string) {
    return this.http.get<Request[]>(this.baseUrl + `/${userId}`);
  }

  createNewRequest(userId: string, data: Request) {
    const payload = {
      userId,
      type: data.type,
      date: data.date.toLocaleString("en-CA").substring(0, 10)
    };
    return this.http.post<Request>(this.baseUrl, payload);
  }

  deleteRequest(id: string | undefined) {
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
}
