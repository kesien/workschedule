import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserLogin } from 'src/app/shared/models/login.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IsLoadingService } from 'src/app/shared/services/isloading.service';

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
    public isLoading: IsLoadingService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.user).subscribe(
      () => this.ref.close(),
      error => this.alertService.error(error)
    )
  }
}
