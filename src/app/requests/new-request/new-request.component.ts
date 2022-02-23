import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Request } from '../request.model';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  @Input() model!: Request;
  @Output() onCreateNewRequest = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  requestTypes = [
    { type: '8:00', value: 0 },
    { type: '9:30', value: 1 },
    { type: 'Szabadság', value: 2 },
  ];
  constructor() {}

  ngOnInit(): void {}

  createRequest() {
    const date = new Date(this.model.date);
    this.model.year = date.getFullYear();
    this.model.month = date.getMonth() + 1;
    this.model.day = date.getDate();
    this.onCreateNewRequest.emit(true);
  }

  cancel() {
    this.onCancel.emit(false);
  }
}
