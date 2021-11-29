import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../_models/user.model';
import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.ngxSpinnerService.show();
    this.userService.getUser().subscribe(
      (response) => (this.user = response as User),
      (error) => this.alertService.error(error),
      () => this.ngxSpinnerService.hide()
    );
  }

  updateInfo() {
    this.userService.updateUser(this.user).subscribe(
      () => this.alertService.success('Sikeresen frissítetted a profilod!'),
      (error) => this.alertService.error(error)
    );
  }
}
