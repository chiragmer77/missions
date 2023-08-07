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

  private readonly authToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIwNzJGRjQ0N0Y5RkI0RUZDMzMzMzg5QzNBNUFERUY2MUZCNzM4QkJGIiwidHlwIjoiYXQrand0In0.XPGlVwJQ_RaK01NNQPZoo1Lks7fVbDANzmS_Ez6ADjI0hn22QxrY3kLbrCUMObcJzthsUuhgSRpSfcinSJWOOO8Sn_CuDlKestEIRj9lJGIm98osqAHc5XRWrQNGnyhpF5IkAbWu-7C_FUGsUFusMc06XYdX38pzPrmT6LdVbR2qRXUFyUqchSF9hLIeONnyia0mwGWtmpUOudNL-poSxNBSZqTCAuzrUV_MqL76fFww4ITpST5LqahIILPEG5rGC-Hq9DDsfFFIcwDU0u3pwhdRm0FxG4AJZwT1Sv-TMF-n7b5tjrF2l5o0g2hd7LAquhEI0VdX_CCnnXEv8FGl1Q.hH8rRAP9Zgq6L6kEvTlVgA.FC6nCzUKT--421hqqLV4Egw2Lz9Va04MhlIDX7JxtbKqZxp_ozXklPXr4cQNkralffeplAbsOzEN8HEViAnzVhEiYBEhEXpzEII-9GikaFatIGKkvOojcO_Ech36HVQzM7YN2Fi9ee_vQGqqdiGP190rLdUKh7aUMDVmOL-Qbggpy2z_W--7kC955tKI2cy8huoEGMJJHX6oC0JDwna9mi7glNiFkkYRseGBpz6O9JgYN_piErLfCM0BGYdNidwY5v9nAaLYiiVuOoi28aKCKMstSNet0gkP27n4LpXjnmuF4Sj86aIeCzulA72Tpf6YUZ26SVZGRiN-g4Q_mvh6e3ASDeiQ8j9yl9WJVORZMxPDRsu-qWxhVSytBm4GSXcqwifDOu9XF3fIMIqFrPt5k6zIWPAtyYv_dfPD_x93t8M_BIzYV-_bXS9NtX5HZLNwuqotw60AqMwB3llnM9ydi22oYtc_AJ4us9o-B_ku4JqyOeJHN7ownLEJtxXjBJ8HFkrzBwH3ceXxSDED7af3eShNhOoWD3MQjgJDHkIF4xnJWiIdKDwL0XuHUxtgW6YixXzjIUtjYbrsTXKUXwOIa-8a2GfXAN7Gm1yZRepBKXzvX_peFyzp_PaKWqgN5Y5GjNhS0Fp7hk9xVuq4oCpubVkM_hkgorKRYZj4LCgZqxwz044s_MYhlXeD8Mr7JrzvfO2P5CJnmQshEscMcn666Owvq-2wlS_bga0nCgjN5zCuWQe-3yc1xKfiM9ggMRLCt7LOhbjwXw_iEuX57RUP1Xn_BvJhcup6dehlSLp3fmB6e0Lr4Mur_jHNw8FhamePzrWVuw2Q77wV_URfUmJ1I_ELx0uEitxget5O8tPEyXiCl5KG6dvVYCAIctm6ZLolYdc6WqZtamLbMyU7s4QZ8VNBA51T2l-mRT5DwAIwNWcYlfXN_UXnCZL_33zJXvYKVPJglK-Q6pO0tnKlT0WBlGHOCCgz_qIuHZWTFonxlITXvVsjtWDd5-yS0nC_JasfIjJqrkHf0MRHiXaAq3aT_Q0mtFqHGOrR0kprXlkQ027XGRoKHMEkFgR_PdtYzHRhvzlxb0C3QA2ZiekLAbdkRX5SEnKcZ1bKhyjFJGuNG674dsD5Ath-pRHGkVxgQ4PCwn_0RcMYzH7MCA0JeVJ_l5--_tsRvz8dmTAW08bn7rqO1h4mD1Yr3KD8D-R9zmxoUR1UhfTSA7Z-qTef-ZtuEPP3svt1sCHEXh4H6vnWfdZRNcFjgKZ0mLD6AUGNDooINdV_eMMmaVGSnsio2hKJrPEzONPFsUviX9rpOnCd0b5R5L0RLk7CszvZYvhgUIT42lI4eBdHENKI63ELzAKvyw.GKWd0mzk9Q-sw0myYgiD2fKb3iXT4pF5_TblLXHxYl0'; // Replace this with your actual authorization token


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