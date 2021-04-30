import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert("Bitte einloggen für Adminbereich.");
      console.log("Activated route: ", state);
      this.router.navigate(["login"]);
      return false;
    }

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert("Bitte einloggen für Adminbereich.");
      console.log("Activated route: ", state);
      this.router.navigate(["login"]);
      return false;
    }

  }

}
