import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http"
import { ErrorResponseInterceptor } from './shader/error-response.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(),
      withInterceptors([ErrorResponseInterceptor])),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideToastr()
  ]
  //providers: [provideRouter(routes), provideClientHydration()]
};
