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

  private readonly authToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIwNzJGRjQ0N0Y5RkI0RUZDMzMzMzg5QzNBNUFERUY2MUZCNzM4QkJGIiwidHlwIjoiYXQrand0In0.YnnwDMuyrxTFSJEU8BDzT3jJtpOMNl3uTE2kAEcCDVm8l6vqV8ChemrHRYasROlwLRqJ3-e6X673kKRq-qg3TqYHJJ8a3_ofNhrieBlUta9mFiYZi8vNQK78RDn23Or7a0diVhN9pWQcakH_FLBl5gBwvfrCGvNy51mUWOAkOf_z_btp-aaFq5ZXVcLFNm2J9Hz8U1GG9T6jxNNOa-2QpFcGfk8O9AgZGRgriFCEBfH5UPlkII_CtjalX7_0fI7wdq9PDEn_UcEAsuxiUk-iNPh7C2IzNUN1XDTY5VJ-3EMs6zNEsKbYl6We60vRBnkYIJB3qWgt5s-DIReKVQG-_g.2ONUYL9f6A5uJ4icVF50xQ.2PXPcbNhWAkduiPiJWRNGajmTnGL33j_GEsVPeF5TIESXEMzCGpWk-PFVXAdKD3aMpWQlXN3VVJmgGQk_fNDCMbn5339oDFz0Yh7LRc3H2PQnklP-8M-qDaYZaG0VYrNrFK-_X9L15K84paaj2HuAAIwlvr6EBEj3WrxFnJw29qmzdINyUPIOEejMsqVodCjcQczItUktthRTquzsRAB5KMsHEosIc7hYkejiyR-zL215cCr3aXcsiDaJeZ2qhV3lVSmDyuv8LmD0EDhSxaJBqR-5ZxcqsaEvt4yICZpBYaScT2-vMUMH6lgchnBaQmwFBtOyIxm0jYs6IFh9YuAXMa7oQPcUGBI1a2PDPovwzs51ggC_xm24RYWmg7buN1GhSPI0Hobd9ryL4bFYMcxq5TXwe_PVbKG8KlW16bbD5PHXwVpRKxJtKlVIww9OQodm1JEKJ-6TYujb7k3F2t2OsSueu_FiPL_sQDpezeycaR9HOUePuauipO6AImMvrMtJweyNWgj8OIGdoCAzJ6DfTesPbiu1CrwCgAVpZeD2gpFmGAbLWeFFOr9h6CtoYo4s9LWp7ahBWR61o3AZ4rl9qPS4cYa758IIEQ9_YviQ_vOS0ZWH86XjUVulZ0ZHl6aw58x9nv7dJWqKfVX_Mx3VFyzk-faSyLiRxQZ1SRqf-TU0ktwY9hClPuJONTbGbmLuGzPd7vwEUThPWwQbABwebk6qKf_NJLjsGzQR5SJjxfgKpIw0mc6Q5BFiQriK3QI3k2FC9arj3RMujcAYkbsMuzTKODLxDddYQbHI4tDNQZX2lrnjuN_nnzfSnP3VVXWJ4Re7QD9Jx1Ecj3un0Co4nBh0WFvHkZzJawWjo_m_Hk9GhxuwN6YqHesCwmobtgVIeN6s88PWUSzj822PqXckLGbJtKarx68vZWS7p4n0NvEYO64TGv4-Si43hE_d1fTaKERJvZJzWbG5GyTq2XyDmAUVuF80ZBDjBqORGIxUm6-z0HaZSwzQnecOBGQKNT8bVeVj-lIc8ZV8GiuwlrzEhC29Uli3x8vv6M8zryrZDMpdXcwBOcaK3rbHK07GEwIovS5HqoSkSYNgPU88VBVYyRBFxY0VfDUHI-lkmY707slFeuouiFYFMMVegXliR3XMP7X1jeJbCqORs1x_Gxt7j5iOO6IkJ0hsA81UJTcRcyCXCBCSrX4K7FMhdd1zDl8Q4sK5cm5iLluYPJywpvUHowkMqq7NnXgxnG2dyFHl0iiY25WOlVQNB1LhSPJerHTN_MwyYtZ6F-f2-ZoTIR6cmiBD1qKZ-TN4FaU-8vKqRpGA1dS2ya16SsbNBnAabyUoSr9Q2LPSw0NSQcII-PrYA.Ed8V2SAqRDfVz2x5ME4aHU-3KgOvKulN43tZp1RrNQU'; // Replace this with your actual authorization token


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