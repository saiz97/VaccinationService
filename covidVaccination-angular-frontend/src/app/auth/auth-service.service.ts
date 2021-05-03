import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  private BASE_URL: string = "http://covidvaccination.s1810456031.student.kwmhgb.at/api/auth";

  constructor(private http: HttpClient, private stepperService: StepperService) { }

  login (email: string, password: string): Observable<Response> {
    return this.http.post(`${this.BASE_URL}/login`, {
      'email': email,
      'password': password
    }).pipe(catchError(this.errorHandler));
  }

  public setSessionStorage(token: string) {
    sessionStorage.setItem("token", token);
  }

  public decodeToken(): User {
    if (sessionStorage.getItem("token")) {
      const decodedToken = jwt_decode(sessionStorage.getItem("token")) as Token;
      return new User(+decodedToken.user.id, decodedToken.user.ssn, decodedToken.user.email,
                            decodedToken.user.firstName, decodedToken.user.lastName,
                            (+decodedToken.user.isAdmin == 1));
    } {
      return null;
    }
  }

  public getCurrentUser(): User {
    return this.decodeToken();
  }

  public logout() {
    this.http.post(`${this.BASE_URL}/logout`, {});
    sessionStorage.removeItem("token");
    console.log("logged out");
    this.stepperService.currentStepIndex.next(1);
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      return this.getCurrentUser().isAdmin;
    } else {
      return false;
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
