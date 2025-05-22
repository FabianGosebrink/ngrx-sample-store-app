import { Routes } from '@angular/router';
import { ShellComponent } from './features/shell/container/shell/shell.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as productDetailEffects from './features/product-detail/state/product-detail.effects';
import { productDetailReducer } from './features/product-detail/state/product-detail.reducer';
import { productDetailFeatureKey } from './features/product-detail/state/product-detail.state';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import(
            './features/products/container/products/products.component'
          ).then((c) => c.ProductsComponent),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            './features/product-detail/container/product-detail/product-detail.component'
          ).then((c) => c.ProductDetailComponent),
        providers: [
          provideState(productDetailFeatureKey, productDetailReducer),
          provideEffects(productDetailEffects),
        ],
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import(
            './features/checkout/container/checkout/checkout.component'
          ).then((c) => c.CheckoutComponent),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'products',
      },
    ],
  },
];
