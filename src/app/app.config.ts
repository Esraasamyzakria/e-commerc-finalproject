import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {  provideAnimations } from '@angular/platform-browser/animations';
import { api_url } from './core/custom-injection/api_url';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/headers/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loedingInterceptor } from './core/interceptors/loeding/loeding.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorsInterceptor,loedingInterceptor])),
     provideAnimations(), // required animations providers
     provideToastr(),
     importProvidersFrom( NgxSpinnerModule),
     provideAnimations(),
     provideAnimationsAsync(),
     providePrimeNG({
         theme: {
             preset: Aura
         }
     }),

     {
      provide: api_url,
      useValue:'https://ecommerce.routemisr.com/api/v1'
     }

  ]
};
