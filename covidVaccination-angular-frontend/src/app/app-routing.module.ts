import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AppointmentStepComponent } from './components/patient-area/appointment-step/appointment-step.component';
import { ConfirmStepComponent } from './components/patient-area/confirm-step/confirm-step.component';
import { LocationStepComponent } from './components/patient-area/location-step/location-step.component';
import { PatientAreaComponent } from './components/patient-area/patient-area.component';
import { StateStepComponent } from './components/patient-area/state-step/state-step.component';

const routes: Routes = [
  { path: '', redirectTo: 'anmeldung', pathMatch: 'full' },
  { path: 'anmeldung', component: PatientAreaComponent },
  { path: 'verwalten', component: AdminAreaComponent },
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
