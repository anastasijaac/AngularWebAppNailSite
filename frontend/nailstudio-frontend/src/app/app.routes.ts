import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { AppointmentComponent } from './modules/client/appointment/appointment.component';
import { EmployeeViewComponent } from './modules/employee-view/employee-view.component';
import { AppointmentStatusComponent } from './modules/client/appointment-status/appointment-status.component';
import { FeedbackComponent } from './modules/client/feedback/feedback.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'employee-view', component: EmployeeViewComponent },
  { path: 'appointment-status', component: AppointmentStatusComponent },
  { path: 'feedback', component: FeedbackComponent },
];
