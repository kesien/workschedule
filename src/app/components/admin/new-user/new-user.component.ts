import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { USER_TYPES } from 'src/app/shared/constants/usertype.constant';
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
    role: undefined,
    name: '',
  };
  userTypes = USER_TYPES;


  constructor(private ref: DynamicDialogRef) {}

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

  close() {}

  save() {
    this.ref.close(this.user);
  }
}
