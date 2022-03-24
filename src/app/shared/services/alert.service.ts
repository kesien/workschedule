import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private messageService: MessageService) {}

  success(message: string) {
      this.messageService.add({severity:'success', detail: message});
  }

  error(message: string) {
      this.messageService.add({severity:'error', detail: message});
  }

  warning(message: string) {
      this.messageService.add({severity:'warn', detail: message});
  }

  info(message: string) {
      this.messageService.add({severity:'info', detail: message});
  }
}
