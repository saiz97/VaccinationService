import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    isAdmin: boolean
  }
}

export class User {
  constructor(
    public id: string,
    public ssn: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public isAdmin: boolean) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = "http://covidvaccination.s1810456031.student.kwmhgb.at/api/auth";
  user: User = null;

  constructor(private http: HttpClient) { }

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

      this.user = new User(decodedToken.user.id, decodedToken.user.ssn, decodedToken.user.email,
                            decodedToken.user.firstName, decodedToken.user.lastName, (+decodedToken.user.isAdmin == 1));
      return this.user;
    } {
      return null;
    }
  }

  public getCurrentUserId() {
    return Number.parseInt(sessionStorage.getItem("userId"));
  }

  public logout() {
    this.http.post(`${this.BASE_URL}/logout`, {});
    sessionStorage.removeItem("token");
    console.log("logged out");
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
