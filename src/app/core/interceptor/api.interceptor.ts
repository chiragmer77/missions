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

  private readonly authToken = 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiIwNzJGRjQ0N0Y5RkI0RUZDMzMzMzg5QzNBNUFERUY2MUZCNzM4QkJGIiwidHlwIjoiYXQrand0In0.pG7lRkNpkOwOtORg1CyoA9j7DR_g535gUcmQAARi3GY4Vo2-z8ChfbB3DImhSK1TClPmrDLGCpa5IPUrnf_5llk0VkBNaboCKmVSS9kenvBLhcTkVA0ynJoBi-9swtSj1uyqafJhJ-TpXl4hU7JJoyrcQHcyWbaPbpOsR8W5mX5qw6ToeJeeWKPGhf6L4ZfmDBCH2JWjyl7frDEPdMZzzA0FxxK3RXpLeihk-DzB1Ztf4AkJuOWKp-o4H8AiDuUX-5fDIc3lGw9CfyEpMKnQOoCvMmor4APRhwjKy9AsTjtbbool2RHJqi7uyJZeQVaNm_X4NLBGYpg4IspegQMqZg.yg43j4Xi3y8yZRMi8hjUeg.fAmfx9W7e8h7Lgy55fRQQSwWJRDcMpb3FP_RsLRqqBEoqbHmeCRkT7vq7LNK2P5DhnPI9a6KtBm33M1X_uO983qdRnR6FUTNfsSSglbBp7pTBYU_SUcpimQJtfIYua5v5C1-Ir27tzDWctQlva61xtvwpn8a5u_hwz_sufp8p5uibP_XK0gYZk0NCj5ZgTMNiSGaa-IinBQGYfsaTZQMluFtkRSexvHuRwX1FGWOsTo_iYKG1DIyYgZKAyiBPZkiB4dzQs0AXrVP15BMuNWNWvX7ImO_oEucHL4AW1g4luQWkVYw0uUIU20MbF-d6qt2So3y99OiWmcrv3s9mCHjqoZX6qp4Td_MAiN6NTSd4ybTTgSPb5TiGAgbaTn3nBKhdy7HeMomrcaLMxgGsoYKdOhdOnuUhIMh9goWeNJA0tf_Jiv2YpXeYoLQ87LbtDUe4zUUrEpjMVECDqr7BTM8L_zoeZqGmoYD-_PmrBXelThDdFP7Iu2bvkghkAX0frmh8qwnBR67KQcDVSaSZGCwVMghmF1kiUhpziYQhmZKaL6RASl_mZxFtMcHZf0Ci7XMuEA-qb4EJCeCUt1BDhkbFopj20UDr9rFQHW_uJgs3Ef7ZvxJpmxRRdDrJX6dptHc_T6v4EhUYFuXCkLVnikhex9ad_UWykjIUs_OxUDnwE9k_uM3TBJlOrOT7BdtNJGqWdxrcBXHSzWIByyPvvcLfXrX3BDi_ETM_o2l961waTNRCbV0lMflPN9iFk2ry6QPiJqgMeMy9T9cwPvgwkonNtDVi9WaNiXIQag4d7yuGA24PU1q-e2SsEKe2baahYfq_lQcE1PGa8Zeho9Wt_LWt_6cyO8lZ4tKmwP3ioHsqGNSc2kLGoPwf9wcLyLQ3cufRywi4Tr6sKG2qWTXki8qLPNmtSsI8lo3STYb-UX5QHbCvCMnfbjuDUNJ3ohx2U_M-Wd77CamBYnCMVGDyUSgxCT0TuYhpe0U38yoJJxBGv_zVapI25fmTkKPBwNjHhEWiEPp-ynJojnOv1lvtnIj4CF_5X0agRU8AI7p1rmzjairOSdPQSzV7UKCeOSvNL8DsvCjXL6FYp-PLndGmBuc1WprTbSnyqHrxTqkvt77mUJoqSHRK3ggyCMUkzPdSS23GX_mopboJeAJQWka1pa6pmJzJaXoQtAsFYEBp4N4vBBWQAXFpP367ZYpZd-aYzEMj-99zAosk3rjt90W6Ba61ZdCG3vEax6IGp4LUsRWwtmvoRLJLnzIHkPP0fqT-n-pMLMwQRIsNZBSvphd8cuCq6rUzDfJG4DreELg3DQ6n2TNtOpaLzamKgtsf4dr9nMr6xio_B0PvGiWu-ZaQ2p_WQ.sCUVOvAiWjgjh1LBIR-8IoNMtJa_MsOB5p9mfXdzZZw'; // Replace this with your actual authorization token


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