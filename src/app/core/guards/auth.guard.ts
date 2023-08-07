import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private toaster: ToastrService
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      // If the user is not authenticated, redirect them to the login page.
      this.router.navigate(['/auth/login']);
      this.toaster.warning('This area is restricted. Please provide valid credentials to access the content.')
      return false;
    }

  }

  private checkIfUserIsAuthenticated(): boolean {
    // Check if the JWT token exists and is not expired
    const token = localStorage.getItem('authToken');
    if (token) {
      // Here, you can use a JWT library (e.g., jwt-decode) to decode the token and check its expiration date
      // For simplicity, we assume that the token is valid if it exists.
      return true;
    }
    return false;
  }

}
