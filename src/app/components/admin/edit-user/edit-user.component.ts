import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { USER_TYPES } from 'src/app/shared/constants/usertype.constant';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user!: User;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  userTypes = USER_TYPES;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void { 
    this.user = this.config.data.user;
  }

  save() {
    this.ref.close(this.user);
  }

  close() {}
}
