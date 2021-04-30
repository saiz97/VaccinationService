import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';
import { VaccinationAddComponent } from './components/admin-area/vaccinations/vaccination-add/vaccination-add.component';
import { VaccinationEditComponent } from './components/admin-area/vaccinations/vaccination-edit/vaccination-edit.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PatientAreaComponent } from './components/patient-area/patient-area.component';

const routes: Routes = [
  { path: '', redirectTo: 'anmeldung', pathMatch: 'full' },
  { path: 'anmeldung', component: PatientAreaComponent },
  { path: 'verwalten', canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
    { path: '', component: AdminAreaComponent },
    { path: 'termin/new', component: VaccinationAddComponent },
    { path: 'termin/:id', component: VaccinationEditComponent }
  ]},
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
