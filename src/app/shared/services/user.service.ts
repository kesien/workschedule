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

  getUser(userId: string) {
    return this.http.get<User>(
      this.baseUrl + `/${userId}`
    );
  }

  updateUser(requesterId: string, user: User) {
    return this.http.put<User>(this.baseUrl, { requesterId, ...user });
  }

  getAllUser() {
    return this.http.get<User[]>(this.baseUrl);
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

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl, user);
  }
}
