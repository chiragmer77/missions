import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      // If the user is not authenticated, redirect them to the login page.
      this.router.navigate(['/auth/login']);
      return false;
    }

  }

  private checkIfUserIsAuthenticated(): boolean {

    return true;
  }

}
