import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { User } from 'src/app/shared/models/user.model'

@Component({
  selector: 'app-initer',
  templateUrl: './initer.component.html',
  styleUrls: ['./initer.component.css'],
})
export class IniterComponent implements OnInit {
  @Input() progressValue = 0
  @Input() users?: User[]
  @Input() step = 1
  @Output() onUserSelected = new EventEmitter()
  @Output() onDeadlineSelected = new EventEmitter()
  @Output() onAmountChanged = new EventEmitter()

  private _selectedUsers: User[] = []
  private _selectedDate?: Date
  private _maxAmount?: number = 0

  get selectedUsers() {
    return this._selectedUsers
  }

  set selectedUsers(value) {
    this._selectedUsers = value
    this.onUserSelect(this._selectedUsers)
  }

  get selectedDate() {
    return this._selectedDate
  }

  set selectedDate(value) {
    this._selectedDate = value
    this.onDateSelection(this._selectedDate)
  }

  get selectAmount() {
    return this._maxAmount
  }

  set selectAmount(value) {
    this._maxAmount = value
    this.onAmountChange(this._maxAmount)
  }

  constructor() {}

  ngOnInit(): void {}

  onUserSelect(users: User[]) {
    this.onUserSelected.emit(users)
  }

  onDateSelection(date?: Date) {
    this.onDeadlineSelected.emit(date)
  }

  onAmountChange(amount?: number) {
    this.onAmountChanged.emit(amount)
  }
}
