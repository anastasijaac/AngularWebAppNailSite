import {Routes} from '@angular/router';
import {HomeComponent} from './modules/home/home.component';
import {LoginComponent} from './modules/login/login.component';
import {RegisterComponent} from './modules/register/register.component';
import {AppointmentComponent} from './modules/client/appointment/appointment.component';
import {EmployeeViewComponent} from './modules/Mitarbeiter/employee-view/employee-view.component';
import {AppointmentStatusComponent} from './modules/client/appointment-status/appointment-status.component';
import {FeedbackComponent} from './modules/client/feedback/feedback.component';
import {FeedbackTerminComponent} from './modules/Mitarbeiter/feedback-termin/feedback-termin.component';
import {AuthGuard} from './services/auth.guard';


export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard]},
  {path: 'employee-view', component: EmployeeViewComponent, canActivate: [AuthGuard]},
  {path: 'appointment-status', component: AppointmentStatusComponent, canActivate: [AuthGuard]},
  {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
  {path: 'feedback-termin', component: FeedbackTerminComponent, canActivate: [AuthGuard]},
];
