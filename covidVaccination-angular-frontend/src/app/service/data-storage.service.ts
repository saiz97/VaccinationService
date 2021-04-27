import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { State } from '../model/state';
import { Location } from '../model/location';
import { Vaccination } from '../model/vaccination';

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

  getVaccinationsOfState(state: string): Observable<Array<Vaccination>> {
    return this.http.get(`${this.BASE_URL}/vaccinations/state/${state}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
