import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, map } from 'rxjs/operators';
import { IsLoadingService } from '../services/isloading.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private ngxSpinnerService: NgxSpinnerService, private isLoading: IsLoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let finished = false;

    setTimeout(() => {
      if (!finished) {
        this.isLoading.isLoading = true;
        //this.ngxSpinnerService.show();
      }
    }, 500);

    return next.handle(request).pipe(
      finalize(() => {
        finished = true;
        this.isLoading.isLoading = false;
        //this.ngxSpinnerService.hide();
      })
    );
  }
}
