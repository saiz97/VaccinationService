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


  constructor(private http: HttpClient) { }

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
    return this.http.get(`${this.BASE_URL}/reservation/user/${userId}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllVaccinations(): Observable<Array<Vaccination>> {
    return this.http.get(`${this.BASE_URL}/vaccinations`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getVaccinationById(vacId: number): Observable<Vaccination> {
    return this.http.get(`${this.BASE_URL}/vaccination/${vacId}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getReservationsByVaccination(vacId: number): Observable<Array<Vaccination>> {
    return this.http.get(`${this.BASE_URL}/reservations/vaccination/${vacId}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveBookingOfUser(userId: number, vacId: number, slot: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/reservation`,
                { user_id: userId, vaccination_id: vacId, selectedSlot: slot + 1 })
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeBookingOfUser(userId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/reservation/user/${userId}`)
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createVaccination(vaccination: Vaccination): Observable<any> {
    return this.http.post(`${this.BASE_URL}/vaccination`, vaccination)
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteVaccination(vacId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/vaccination/${vacId}`)
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateVaccination(vaccination): Observable<any> {
    return this.http.put(`${this.BASE_URL}/vaccination/${vaccination.id}`, vaccination)
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateUserVaccinationStatus(ssn: number, newVacStatus: boolean) {
    return this.http.put(`${this.BASE_URL}/user/${ssn}`, {isVaccinated: newVacStatus})
                .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
