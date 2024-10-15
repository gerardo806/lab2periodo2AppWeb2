import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {RegistroComponent} from './pages/registro/registro.component';
import {CommonModule} from '@angular/common';
import {provideRouter} from '@angular/router';
import {registroRoutes} from './registro.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const registroConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(registroRoutes)
  ],
};
