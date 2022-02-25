import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Input() users!: User[];
  @Output() onDeleteUser = new EventEmitter();
  @Output() onEditUser = new EventEmitter();
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  deleteUser(user: User) {
    this.onDeleteUser.emit(user);
  }

  editUser(user: User) {
    this.onEditUser.emit(user);
  }
}
