import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';
import { PatientAreaComponent } from './components/patient-area/patient-area.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StepperNavigationComponent } from './components/patient-area/stepper-navigation/stepper-navigation.component';
import { StateStepComponent } from './components/patient-area/state-step/state-step.component';
import { LocationStepComponent } from './components/patient-area/location-step/location-step.component';
import { AppointmentStepComponent } from './components/patient-area/appointment-step/appointment-step.component';
import { ConfirmStepComponent } from './components/patient-area/confirm-step/confirm-step.component';
import { VaccinationEditComponent } from './components/admin-area/vaccinations/vaccination-edit/vaccination-edit.component';
import { VaccinationAddComponent } from './components/admin-area/vaccinations/vaccination-add/vaccination-add.component';

import { DataStorageService } from "./service/data-storage.service";
import { StepperService } from "./service/stepper.service";
import { StepDirective } from './service/stepper.directive';
import { AuthService } from './auth/auth.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDEAT from '@angular/common/locales/de-AT';
import { TokenInterceptor } from './auth/token.interceptor';
registerLocaleData(localeDEAT);

@NgModule({
  declarations: [
    AppComponent,
    AdminAreaComponent,
    PatientAreaComponent,
    LoginFormComponent,
    StepperNavigationComponent,
    StateStepComponent,
    LocationStepComponent,
    AppointmentStepComponent,
    ConfirmStepComponent,
    VaccinationEditComponent,
    VaccinationAddComponent,
    StepDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'de-at'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DataStorageService,
    StepperService,
    AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
