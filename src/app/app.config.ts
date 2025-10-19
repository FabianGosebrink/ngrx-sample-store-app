import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { checkoutFeatureKey } from './shared/checkout/state/checkout.state';
import { checkoutReducer } from './shared/checkout/state/checkout.reducer';
import * as checkoutEffects from './shared/checkout/state/checkout.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(),
    provideStore({
      [checkoutFeatureKey]: checkoutReducer,
    }),
    provideEffects([checkoutEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideToastr({ positionClass: 'toast-bottom-right' }),
  ],
};
