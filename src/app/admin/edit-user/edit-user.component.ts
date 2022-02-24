import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() user?: User;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  save() {
    this.onSave.emit(this.user);
  }

  cancel() {
    this.onCancel.emit(true);
  }
}
