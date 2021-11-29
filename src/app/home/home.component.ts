import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loginMode = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  triggerLoginMode() {
    this.loginMode = true;
  }

  cancelLoginMode(loginMode: boolean) {
    this.loginMode = loginMode;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
