import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest: any = request;
    // Check if the request URL matches the target URL
    if (request.url === 'http://50.116.33.87/connect/token') {
      // Set the Content-Type header to application/x-www-form-urlencoded
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      // Construct the request body with the required parameters
      const body = new HttpParams()
        .set('grant_type', 'password')
        .set('username', authRequest.body.username)
        .set('password', authRequest.body.password)
        .set('granttype', authRequest.body.granttype)
        .set('grant_type', authRequest.body.grant_type)
        .set('scope', authRequest.body.scope)
      authRequest = request.clone({ headers, body });
    } else {
      // Add authorization token to the request headers;
      const authToken = localStorage.getItem('authToken');
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
    // Handle the request and catch any errors
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        this.spinner.hide('prBudget');
        // Handle different types of errors here
        if (error.error instanceof ErrorEvent) {
          // A client-side error occurred
          this.toaster.error(error.message);

          console.error('Client-side error:', error.error.message);
        } else {
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
            this.toaster.warning('Your toekn is invalid. Please log in to continue.')
          } else {
            this.toaster.error(`Server-side error: Status - ${error.status}, Message - ${error.error?.message}`);
          }
          // A server-side error occurred
        }
        // this.toaster.error(error.message)

        // Pass the error along to the calling code
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}
