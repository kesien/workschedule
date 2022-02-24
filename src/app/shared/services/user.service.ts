import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseApiUrl + 'users';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(userId: string): Observable<User> {
    return this.http.get(
      this.baseUrl + `/${userId}`
    ) as Observable<User>;
  }

  updateUser(requesterId: string, user: User): Observable<User> {
    return this.http.put(this.baseUrl, { requesterId, ...user }) as Observable<User>;
  }

  getAllUser(): Observable<User[]> {
    return this.http.get(this.baseUrl) as Observable<User[]>;
  }

  deleteUser(id: string) {
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

  createUser(user: User): Observable<User> {
    return this.http.post(this.baseUrl, user) as Observable<User>;
  }
}
