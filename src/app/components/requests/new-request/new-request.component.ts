import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant';
import { IsLoadingService } from 'src/app/shared/services/isloading.service';
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
    public isLoading: IsLoadingService
    ) {
      this.request = {
        date: new Date(),
        type: 0
    }
  }

  ngOnInit(): void {}

  close() {}

  save() {
    this.requestService.createNewRequest(this.config.data.userId, this.request).subscribe(
      null,
      error => {console.log(error);
      },
      () => {
        this.ref.close(this.request) 
      }
    );
  }
}
