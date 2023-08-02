import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly authToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIwNzJGRjQ0N0Y5RkI0RUZDMzMzMzg5QzNBNUFERUY2MUZCNzM4QkJGIiwidHlwIjoiYXQrand0In0.hrHIXu_DXhMu6lMcSAX8FMTuVi25fdi8uerbosbaSKJNlJCFDxWGqipbBG_3FLM1nkCN1bE_SZH4mXLhP9t09CX3k0yw6XT4ELFIEV6WAhoU4i5Fo-g-rJe3I-rCKac-SbotbXRpgEpabB2qRgAi7TpsPp8l2ZRQzByGKQy01DgKWyMTOMtLvNqXxqDGTm6RinEbBMVn56R542604ZR7qXm7ZrPOwAoxV8RQSU8cycPqmzV8rsuUiPLyy9cydRAZmwTVwYPdVDFKk3bj-1e1Q94DAKUD8HRLihoLWOJvrIjJLUPyqBq66N0-RUCLIncvKXgfXMpiyXkfoCErIO-P1A.0vhU6Y5L3N9trX0mOENlCg.AYayCzyJmu7Qb40fWUyRsp_BMNW4EkTj2R2uWQ7VIRx0C1mNKx0jT75eFb7MiqjDcfHzYYASiBa7fYSNKNqiltLllkF0iSNYpB1XmxNPmLlLqTBWthYZO738JiQ29DzaiIjaO83PAew6rg3kdUeL3IYbF7lVVL6e7MbxdR6d_Qp1BzFOzVBzD1k_VUg6ZQnFJXwct3SkFybtyzvIfqHhWuTEVRgSb1uOJqbEj-2qCZSMy6pUzt82dXtPteSMIhVjo7pvS8Q_ZagqAnAO5ZbvjvBOjh2X5hGy_zIFlqp7d2GhCNTk99iDsmXFoCna2XZKFKucZPJspW1lWqZQ_L8ccIuaMs8xN-sE3c93vqKfrYm4vlmDbpXjj2dK_2GWs1Pp49O3R0zvSSTDDXnhECrnECgK5-7vlh_tm7d25aca3azevi3r0ocWy-m_juu3F74hESCy08Hl4lIo1ckhNCatZ5BiRxEGTT-SXEhxRyZ-02Qx7q1WUrm5aofVqkY13v_ysNx7OeNYN_6PMHU_bmYuJ2QWkwB1kxxoo1UMjxQ_iWPCGaSXEAq9NsH-k0CBcy83y40JrLqOV4IZdouayMOVnGUAIWeKbcnCiCCqoGmyPGg6AEhzB-IoWUQlKDMoGgd1E4-kIETWkg0nHgdRXQRe0mL4ku4nlfp4iVKRlBT2wjIpWukcLYZwzCmTVXMG4Q7iwotCWb3PZLflw3aloC--gHXY1p4bsrsfhqNALRrpXyHqi1SDwi4U88XQeufTRUUAjJUbHN7kpPoQTFGFfv2mCIVHoz3uAUJsjN4VkPKKI6gJ73yAETbbln4KJ8_U8UdueYeEIwK2_JRP3MWUOVVrJoCdJerpHbXv8Gd0taV029OUFXqSxVlMRN0Tjtj_bKax3Whhplku6DeZ6IV3q8mREM_rgyRAfQxeKoJMuV-P1LcGhF7IpKxWU9TG5_EGw1ZfLzW4QZsZlwcYHSNJalgjDtW_aAxDrr6OuKTooRwwLTTB393Uyx9eEXxNDH_1Zd-pzwSjwIdPe9zTaGf_ejHnQg2NjeAjeE_ThrHC2HE69GjZEARd-7qGpt3kLYGphoZLuvGzm9gVmWlTo1lkt_lAi7r-mDjKjiJa6wL0WaOTPFMFhAFY8iF7wJ14hsoyzxU8jwj3rxUC4KmP1J00-bRcgj93ZWvpKqRMU9Wuz7uCQcYpQ4UefE4qbi1OJsiDJqsDSqEma5Y55zant_OBDGa_qcIejSXrUvfqrAJE__10xM6YGT-RJI-jkP-ulMdhTa5CVq5tZQrWBLvJR17Np_Hrb6Qr-N8zKUub-7BVwYueXWP67N8vO5ZgE8oCgwHC9XqFklnJ8uUrQGWvjw0NRdA0eg.IZ6T9g8dtDJlEQ2t9IkE-xN7Gz2oJ14qwOnsaLIO_Rc'; // Replace this with your actual authorization token


  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

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
        console.log(error)

        this.spinner.hide();
        // Handle different types of errors here
        if (error.error instanceof ErrorEvent) {
          // A client-side error occurred
          this.toaster.error(error.message)

          console.error('Client-side error:', error.error.message);
        } else {
          // A server-side error occurred
          this.toaster.error(`Server-side error: Status - ${error.status}, Message - ${error.error.message}`)
          console.error(`Server-side error: Status - ${error.status}, Message - ${error.message}`);
        }
        // this.toaster.error(error.message)

        // Pass the error along to the calling code
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}