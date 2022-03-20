import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs';
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RequestsService } from 'src/app/shared/services/requests.service';
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
    private requestService: RequestsService,
    private config: DynamicDialogConfig,
    private alertService: AlertService,
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

  close() {}

  save() {
    this.requestService.createNewRequest(this.config.data.userId, this.request).subscribe(
      null,
      error => {
        if (error.Messages) {
          for (const message of error.Messages) {
            this.alertService.error(message);
          }
        } else {
          this.alertService.error(error);
        }
      },
      () => {
        this.ref.close(this.request) 
      }
    );
  }
}
