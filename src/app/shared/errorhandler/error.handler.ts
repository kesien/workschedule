import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const alertService = this.injector.get(AlertService);
    
    let messages;
    let message;
    if (error instanceof HttpErrorResponse) {
      messages = errorService.getServerMessages(error);
      errorService.getClientMessage(error);
      errorService.getServerMessage(error);
      for (const message of messages) {
          alertService.error(message);
      }
    } else {
      errorService.getClientMessage(error);
      message = errorService.getClientMessage(error);
      alertService.error(message);
    }
    console.log(error);
    
  }
}