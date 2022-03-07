import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          return throwError(error.error)
        } else {
          if (error.error.Messages) {
            throwError(error.error.Messages.join('\n'));
          }
          return throwError(error.error);
        }
      })
    );    
  }
}