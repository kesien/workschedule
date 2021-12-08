import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../_models/user.model';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { passwordMatchValidator } from '../_validators/customvalidators.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm = new FormGroup(
    {
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.email,
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.pattern('[A-Za-zd$@$!%*?&].{6,}'),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl(''),
    },
    passwordMatchValidator
  );
  user!: User;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUser().subscribe(
      (response) => {
        this.user = response as User;
      },
      (error) => {
        this.alertService.error(error);
      },
      () => {
        this.userForm.controls['userName'].setValue(this.user.userName);
        this.userForm.controls['name'].setValue(this.user.name);
      }
    );
  }

  updateInfo() {
    this.userService
      .updateUser({ id: this.user.id, ...this.userForm.value })
      .subscribe(
        () => this.alertService.success('Sikeresen frissítetted a profilod!'),
        (error) => this.alertService.error(error),
        () => {
          this.authService.setName(this.userForm.get('name')?.value);
        }
      );
  }
}
