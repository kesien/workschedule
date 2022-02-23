import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../requests/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  baseUrl = environment.baseApiUrl + 'requests';
  constructor(private http: HttpClient) {}

  getRequestsForUser(userId: string, year: number, month: number) {
    return this.http.get(
      this.baseUrl + `/${userId}/${year}/${month}`
    );
  }

  getAllRequestsForUser(userId: string) {
    return this.http.get(this.baseUrl + `/${userId}`);
  }

  createNewRequest(userId: string, data: Request) {
    return this.http.post(this.baseUrl, { userId, data });
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
