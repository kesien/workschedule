import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseApiUrl + 'users';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser() {
    return this.http.get(
      this.baseUrl + `/${this.authService.decodedToken.nameid}`
    );
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + `/${user.id}`, user);
  }

  getAllUser() {
    return this.http.get(this.baseUrl);
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }
}
