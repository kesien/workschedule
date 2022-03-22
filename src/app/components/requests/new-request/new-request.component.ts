import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant';
import { Request } from '../../../shared/models/request.model';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  request: Request;
  requestTypes = REQUEST_TYPES;
  constructor(
    private ref: DynamicDialogRef,
    private translate: TranslateService
    ) {
      this.request = {
        date: new Date(),
        type: 0
    }
  }

  ngOnInit(): void {
    this.requestTypes = this.requestTypes.map(rt => {
        return { label: this.translate.instant(rt.label), value: rt.value };
    })
  }

  close() {
    this.ref.close();
  }

  save() {
    this.ref.close(this.request) 
  }
}
