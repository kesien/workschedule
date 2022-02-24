import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  @Output() cancelNewUserMode = new EventEmitter();
  @Output() onCreateNewUser = new EventEmitter();
  user: Partial<User> = {
    userName: '',
    password: '',
    role: 0,
    name: '',
  };
  constructor() {}

  ngOnInit(): void {
    this.user = {
      userName: '',
      password: '',
      role: 0,
      name: '',
    };
  }

  cancel() {
    this.cancelNewUserMode.emit(true);
  }

  createNewUser() {
    this.onCreateNewUser.emit(this.user);
  }
}
