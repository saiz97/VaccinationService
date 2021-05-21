import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { StepperService } from '../service/stepper.service';

export interface Response {
  access_token: string;
}

interface Token {
  exp: number;
  user: {
    id: string,
    ssn: number,
    email: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    isVaccinated: boolean,
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = "http://covidvaccination.s1810456031.student.kwmhgb.at/api";
  private BASE_URL_AUTH: string = `${this.BASE_URL}/auth`;
  adminStatus: boolean = false;

  constructor(private http: HttpClient, private stepperService: StepperService) { }

  login (email: string, password: string): Observable<Response> {
    return this.http.post(`${this.BASE_URL_AUTH}/login`, {
      'email': email,
      'password': password
    }).pipe(catchError(this.errorHandler));
  }

  setSessionStorage(token: string) {
    sessionStorage.setItem("token", token);
  }

  decodeToken(): User {
    if (sessionStorage.getItem("token")) {
      const decodedToken = jwt_decode(sessionStorage.getItem("token")) as Token;
      // this.isAdmin();
      return new User(+decodedToken.user.id, decodedToken.user.ssn, decodedToken.user.email,
                            decodedToken.user.firstName, decodedToken.user.lastName,
                            (+decodedToken.user.isAdmin == 1));
    } {
      return null;
    }
  }

  getCurrentUser(): User {
    return this.decodeToken();
  }

  logout() {
    this.http.post(`${this.BASE_URL_AUTH}/logout`, {});
    sessionStorage.removeItem("token");
    this.adminStatus = false;
    console.log("logged out");
    this.stepperService.currentStepIndex.next(1);
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      this.http.get(`${this.BASE_URL}/user/isAdmin/${this.getCurrentUser().ssn}`)
        .pipe(retry(3)).pipe(catchError(this.errorHandler))
        .subscribe(res => this.adminStatus = res );
    } else {
      this.adminStatus = false;
    }
  }

  isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);

      if (expirationDate < new Date()) {
        console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      } else {
        return true
      }
    } else {
      return false;
    }
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
