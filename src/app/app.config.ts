import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule, withHashLocation } from '@angular/router';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { loadingInterceptor } from './shared/interceptors/loading/loading.interceptor';
import { errorsInterceptor } from './shared/interceptors/errors/errors.interceptor';
import { headersInterceptor } from './shared/interceptors/headers/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor,
        errorsInterceptor,
        headersInterceptor,
      ])
    ),
    importProvidersFrom(
      RouterModule,
      BrowserAnimationsModule,
      ToastrModule,
      NgxSpinnerModule
    ),
    provideAnimations(),
    provideToastr(),
  ],
};
