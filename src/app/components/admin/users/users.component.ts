import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ConfirmationService]
})
export class UsersComponent implements OnInit {
  @Input() users!: User[];
  @Input() isLoading = false;
  @Output() onDeleteUser = new EventEmitter();
  @Output() onEditUser = new EventEmitter();
  @Output() onAddNewUser = new EventEmitter();
  
  constructor(public authService: AuthService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  deleteUser(user: User) {
    this.onDeleteUser.emit(user);
  }

  addNewUser() {
    this.onAddNewUser.emit();
  }

  editUser(user: User) {
    this.onEditUser.emit(user);
  }

  confirm(event: Event, user: User) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Biztos hogy törlöd?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteUser(user);
      },
      reject: () => {
          return;
      }
  });
  }
}
