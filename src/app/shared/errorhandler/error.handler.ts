import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: "root"
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const alertService = this.injector.get(AlertService);
    if (error instanceof HttpErrorResponse) {
      if (error.status >= 400 && error.status < 500) {
        alertService.error(error.error);
      }
      if (error.status == 500) {
        if (error.error.Messages) {
          for (const err of error.error.Messages) {
            alertService.error(err);
          }
        } else {
          alertService.error(error.error);
        }
      }
    } else {
      alertService.error(error.message);
    }
  }
}