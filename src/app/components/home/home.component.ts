import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserLogin } from 'src/app/shared/models/login.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit, OnDestroy {
  ref!: DynamicDialogRef;
  loginMode = false;
  constructor(private authService: AuthService, private dialogService: DialogService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  show() {
    this.ref = this.dialogService.open(LoginComponent, {
        header: 'Bejelentkezés',
        width: '300px',
        baseZIndex: 10000
    });

    this.ref.onClose.subscribe(() =>{
      this.alertService.success("Sikeres belépés!");
      this.router.navigate(['/schedule']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
