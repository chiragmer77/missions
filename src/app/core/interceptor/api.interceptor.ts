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

  private readonly authToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIwNzJGRjQ0N0Y5RkI0RUZDMzMzMzg5QzNBNUFERUY2MUZCNzM4QkJGIiwidHlwIjoiYXQrand0In0.EuHpmX2oc55x0cHiXHs7adNZy4H-mbmAeBwuTXmGYzXITfcw2YjEafj4fpxyYPe13Ci72bVUyQMyQZo39c_Hw6OPQEAyT8BejAmpt52C1YXNJZYhxVVb-w0C4CYlozeXdBJK2yV1ScsaYNyx-4RXsHrwTulLUgOnzNZcW6A1fhGePXYFxEr_PRxDOqHO7HuDC9g0BIcr3k5WoVbRvnnT4Au3z-U_fc3R0ihj1yTMRZD5cTV-XhBTKv5fJMk2LHXxe5i9DYVtAo8saNn_KhLF8I0mEinCTZy5IPeMJlKp7AyNQ3zCkC0jWouedUdJjOIWm6Y4lM0Zcw9AnnGn-7riBQ.oTdHHR8XgebfKeaIy6tg3g.JkRsSQnXmnZteySW2C1jhS2jzpzSOcuz_lOXQU7COJTm47B1jlHS3XigFU2pX2mrpxKAUIGx-tmz2sWIPQPPc7Biqk9JD60J-DeRsPvY0GBHSmtJbj_73eBfIy_YuUEds7z340l9OEYlyIaiguuUCO-pcHJDNOqjk9fpv6VZAUlsbzWq6SYfFNxiQxyKLUkdi9LP0zZl_f6C4jOTRPliXDr4AwlEkdbLqXdmO5hQjkIHNI_9888OlStiMFHzRov2_JMsfhoFuKw5d9vHf2e7_f0fZrd0OpoAyACFY3Mnmmxna-nqJo9tnn5oit5ZrAqXbh31EE08cmkdJx80PuRkWyAk4gDtMlZ3K4-uUm3f03yuej7Z_HGxnMDrzQzRz-G33M9KTzaFe7xwHTyul81TJl9wvsALy_9Ab9KxoxI3jl5LVkYOkOYn5p8ilYEcAA807mXWhzW9X0GcmIsg9dx8CpgMfYMpOYnhkPNCbL_ZTDi1T-WsjzMWyz41WZlznRA_gM4KQGDWbJBDrKRZgbgjSWE9cM5Qk4t_tAvdOv9E3Q_gD9j91FkMOvnFxyOdVY4-9KmQB3j8KZesRdiM6mW3seUY5ACTmBAClISor9hYvbEHBco98on6MdxK0NSVz4tZyRTg5hsImjB1nSEXLmw8D-P43hFhxOV6DkIxfmO8fqO26Ih5bKhCWPHJrEG9sRrDEGtyk_G_fLruq7XogfjQWwZ8XVzH1VT2Jc9hwrWlBl6ShcyPPBOw-326zfxIb4TvDGqr21s65QHclYAusfLK7-WQTY-p02m2-jjxxEeCpsB-2JK977r4mFp7QmgKz44Lx-V6l7lH-v9BYyNLvJ8pg1EnMnRH2gcmTE2fPv-z_YNFi-rtpTuW88DCMJhWZZr1rpooi3QHueTdqfXGn-UMyrTu_OFaCm1wG02cwalTJUJp69lkzwhdppslYVvu9M929Rrkix-8aJiEJNqdfhGlR0sfAZsassxm1rzL3Gde5bCHdEARgEtCmtWvkZW13TLeKrE8AHdlZFOjarHZBpAUH7vrtx9KqkGHwjjaK4g9UoHDN2gUSir6Ku3fgqClW-k_j-zuE53xdsMalwOSpH8ScijT5zH069RnkM8ihyYghrjVWhDc3ROteAfpQhHXE0ZeLE3KnuYHFlufv0bt8pHAUJZ_FeH3fs4rETPgbPipYCG4dWJw8e_Oj-Qa2G1gvBcR4WR6y_1iKDoGAnttRPTSXxeH7080Hbbj5VG43PHCR7UYA7xORc0jMWZKoaHppePwJ8VHK1gS6ly-7_xvUugTXdpH2Efyd7BahDWjPugv4gGcLoWWRIArf6OtyR2zPqTeeLRiImm7TfdC5iCv1zJ8EA.H17galtXTQ6T8mmu9bER1sqix7lmQdaRxgxc3tuAXo8'; // Replace this with your actual authorization token


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