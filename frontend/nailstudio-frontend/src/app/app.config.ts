/**
 * Main application configuration for client-side setup.
 * This configuration includes providers for routing, HTTP client setup, hydration, and animations,
 * ensuring these services are available throughout the application.
 */

import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';

import {appRoutes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideClientHydration(), provideHttpClient(withFetch()), provideAnimationsAsync()]
};

