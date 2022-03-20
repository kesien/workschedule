import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
  userTypes = USER_TYPES;

  newUserForm: FormGroup;

  constructor(private ref: DynamicDialogRef, private formBuilder: FormBuilder, private translate: TranslateService) {
    this.newUserForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl(0),
      name: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.userTypes.forEach(ut => ut.label = this.translate.instant(ut.label));
  }

  cancel() {
    this.cancelNewUserMode.emit(true);
  }

  close() {}

  save() {
    this.ref.close(this.newUserForm.value);
  }

  
  get name() {
    return this.newUserForm.controls['name'];
  }

  get userName() {
    return this.newUserForm.controls['userName'];
  }

  get password() {
    return this.newUserForm.controls['password'];
  }
}
