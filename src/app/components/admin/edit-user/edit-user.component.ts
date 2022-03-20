import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { USER_TYPES } from 'src/app/shared/constants/usertype.constant';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  userTypes = USER_TYPES;
  editUserForm: FormGroup;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private formBuilder: FormBuilder, private translate: TranslateService) {
    this.editUserForm = new FormGroup({
      name: new FormControl(this.config.data.user.name, Validators.required),
      userName: new FormControl(this.config.data.user.userName, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.minLength(6)),
      role: new FormControl(this.config.data.user.role)
    });
   }

  ngOnInit(): void {
     this.userTypes.forEach(ut => {
       ut.label = this.translate.instant(ut.label);
     })
  }

  save() {
    this.ref.close({id: this.config.data.user.id, ...this.editUserForm.value});
  }

  close() {}

  get name() {
    return this.editUserForm.controls['name'];
  }

  get userName() {
    return this.editUserForm.controls['userName'];
  }

  get password() {
    return this.editUserForm.controls['password'];
  }
}
