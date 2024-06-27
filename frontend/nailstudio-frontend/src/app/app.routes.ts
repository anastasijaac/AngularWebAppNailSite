import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { EmployeeViewComponent } from './modules/employee-view/employee-view.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'employee-view', component: EmployeeViewComponent },
];
