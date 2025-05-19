import { Routes } from '@angular/router';
import { ShellComponent } from './features/shell/container/shell/shell.component';
import { provideState } from '@ngrx/store';
import { productsFeatureKey } from './features/products/state/products.state';
import { productsReducer } from './features/products/state/products.reducer';
import { provideEffects } from '@ngrx/effects';
import * as productsEffects from './features/products/state/products.effects';

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
          provideEffects(productsEffects)
        ]
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            './features/product-detail/container/product-detail/product-detail.component'
          ).then((c) => c.ProductDetailComponent)
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
