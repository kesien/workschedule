import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { User } from 'src/app/shared/models/user.model'

@Component({
  selector: 'app-christmass-admin',
  templateUrl: './christmass-admin.component.html',
  styleUrls: ['./christmass-admin.component.css'],
})
export class ChristmassAdminComponent implements OnInit {
  @Input() showIniter = false
  @Input() users?: User[]
  @Output() onSubmit = new EventEmitter()

  value = 0
  initerStep: number = 1

  selectedUsers: User[] = []
  selectedDeadline?: Date
  selectedAmount = 0

  constructor() {}

  ngOnInit(): void {}

  logSelectedUsers(users: User[]) {
    console.log(users)
  }

  logDeadline(date: Date) {
    console.log(date)
  }

  increment() {
    this.initerStep += 1
  }

  decrement() {
    this.initerStep -= 1
  }

  isStepValid(): boolean {
    switch (this.initerStep) {
      case 1:
        if (this.selectedUsers.length > 0) {
          return true
        }
        break
      case 2:
        if (this.selectedDeadline && this.selectedDeadline > new Date()) {
          return true
        }
        break
      case 3:
        if (this.selectedAmount > 0) {
          return true
        }
        break
      default:
        return false
    }
    return false
  }

  submit() {
    this.onSubmit.emit()
  }
}
