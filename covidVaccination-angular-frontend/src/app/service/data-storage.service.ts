import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { State } from '../model/state';
import { Location } from '../model/location';
import { Vaccination } from '../model/vaccination';
import { User } from '../model/user';
import { Reservation } from '../model/reservation';

@Injectable()
export class DataStorageService {

  private BASE_URL: string = "http://covidvaccination.s1810456031.student.kwmhgb.at/api";

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {

  }

  getAllStates(): Observable<Array<State>> {
    return this.http.get(`${this.BASE_URL}/states`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getLocationsOfState(state: string): Observable<Array<Location>> {
    return this.http.get(`${this.BASE_URL}/state/${state}/locations`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllLocations(): Observable<Array<Location>> {
    return this.http.get(`${this.BASE_URL}/locations`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getVaccinationsOfState(state: string): Observable<Array<Vaccination>> {
    return this.http.get(`${this.BASE_URL}/vaccinations/state/${state}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  checkVaccinationStatus(userId: number): Observable<any> {
    const headers = this.headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    return this.http.get(`${this.BASE_URL}/reservation/user/${userId}`, { headers: headers }).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveBookingOfUser(userId: number, vacId: number, slot: number): Observable<any> {
    const headers = this.headers.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    return this.http.post(`${this.BASE_URL}/reservation`,
                { user_id: userId, vaccination_id: vacId, selectedSlot: slot } as Reservation,
                { headers: headers })
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
