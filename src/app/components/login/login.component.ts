import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserLogin } from 'src/app/shared/models/login.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserLogin = {
    username: '',
    password: ''
  };
  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig, 
    private authService: AuthService, 
    private alertService: AlertService
    ) {}

  ngOnInit(): void {}

  login() {
    this.ref.close(this.user);
  }

  close() {
    this.ref.close();
  }
}
