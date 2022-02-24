import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from '../models/request.model';
import { Years } from '../models/years.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  baseUrl = environment.baseApiUrl + 'requests';
  constructor(private http: HttpClient) {}

  getRequestsForUser(userId: string, year: number, month: number): Observable<Request[]> {
    return this.http.get(
      this.baseUrl + `/${userId}/${year}/${month}`
    ) as Observable<Request[]>;
  }

  getAllRequestYearsForUser(userId: string): Observable<Years> {
    return this.http.get(this.baseUrl + `/years/${userId}`) as Observable<Years>
  }

  getAllRequestsForUser(userId: string): Observable<Request[]> {
    return this.http.get(this.baseUrl + `/${userId}`) as Observable<Request[]>;
  }

  createNewRequest(userId: string, data: Request): Observable<Request> {
    const payload = {
      userId,
      type: data.type,
      date: data.date.toLocaleString("en-CA").substring(0, 10)
    };
    console.log(payload);
    return this.http.post(this.baseUrl, payload) as Observable<Request>;
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
