import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        console.log(error);
        
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string | undefined {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse) {
        console.log(error);
        
        return error.message;
    }

    getServerMessages(error: HttpErrorResponse): string[] {
        console.log(error);
        
        if (error.status >= 400 && error.status < 500) {
            return [error.error];
        }
        return error.error.Messages;
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}