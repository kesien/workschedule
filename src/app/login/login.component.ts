import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  @Output() loginMode = new EventEmitter();
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertService.success('Sikeres belépés!');
      },
      (error) => {
        this.alertService.error(error);
      },
      () => {
        this.router.navigate(['/schedule']);
      }
    );
  }

  cancel() {
    this.loginMode.emit(false);
  }
}
