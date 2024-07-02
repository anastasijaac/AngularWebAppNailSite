import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import '@fullcalendar/core';
import '@fullcalendar/daygrid';
import '@fullcalendar/interaction';
import {AuthGuard} from "./app/services/auth.guard";
import {AuthService} from "./app/services/auth.service";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(), provideAnimationsAsync(),
    AuthService,
    AuthGuard
  ]
}).catch(err => console.error(err));
