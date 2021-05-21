import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.authService.logout();
            this.router.navigate(['login']);
            return of(err.message);
        }
        return throwError(err);
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
    }
}
