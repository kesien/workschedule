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
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          return throwError(error.error as HttpErrorResponse)
        } else {
          if (error.error.Messages) {
            for (const message of error.error.Messages) {
              throwError(message);
            }
          } else {
            throwError(error.error)
          }
          return throwError(error.error);
        }
      })
    );    
  }
}