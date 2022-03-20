import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/shared/validators/customvalidators.validator';
import { User } from '../../shared/models/user.model';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Password } from 'primeng/password';

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
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe(
      (response) => this.user = response as User,
      (error) => this.alertService.error(error),
      () => {
        this.userForm.controls['userName'].setValue(this.user.userName);
        this.userForm.controls['name'].setValue(this.user.name);
      }
    );
  }

  updateInfo() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, { id: this.user.id, ...this.userForm.value })
      .subscribe(
        () => this.alertService.success('Sikeresen frissítetted a profilod!'),
        (error) => this.alertService.error(error),
        () => this.authService.setName(this.userForm.get('name')?.value)
      );
  }

  get userName() {
    return this.userForm.controls['userName'];
  }

  get name() {
    return this.userForm.controls['name'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  get confirmPassword() {
    return this.userForm.controls['confirmPassword'];
  }
}
