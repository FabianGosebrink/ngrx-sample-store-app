import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as productDetailEffects from './features/product-detail/state/product-detail.effects';
import { productDetailReducer } from './features/product-detail/state/product-detail.reducer';
import { productDetailFeatureKey } from './features/product-detail/state/product-detail.state';
import * as productsEffects from './features/products/state/products.effects';
import { productsReducer } from './features/products/state/products.reducer';
import { productsFeatureKey } from './features/products/state/products.state';
import { ShellComponent } from './features/shell/container/shell/shell.component';

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
        providers: [
          provideState(productsFeatureKey, productsReducer),
          provideEffects(productsEffects),
        ],
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
