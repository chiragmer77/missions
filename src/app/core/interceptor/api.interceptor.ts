import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly authToken = 'YOUR_AUTH_TOKEN'; // Replace this with your actual authorization token


  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Add authorization token to the request headers
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`
      }
    });

    // Handle the request and catch any errors
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle different types of errors here
        if (error.error instanceof ErrorEvent) {
          // A client-side error occurred
          console.error('Client-side error:', error.error.message);
        } else {
          // A server-side error occurred
          console.error(`Server-side error: Status - ${error.status}, Message - ${error.message}`);
        }

        // Pass the error along to the calling code
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}