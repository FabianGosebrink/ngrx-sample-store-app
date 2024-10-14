import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as productDetailEffects from './modules/product-detail/state/product-detail.effects';
import { productDetailReducer } from './modules/product-detail/state/product-detail.reducer';
import { productDetailFeatureKey } from './modules/product-detail/state/product-detail.state';
import * as productsEffects from './modules/products/state/products.effects';
import { productsReducer } from './modules/products/state/products.reducer';
import { productsFeatureKey } from './modules/products/state/products.state';
import { ShellComponent } from './modules/shell/container/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import(
            './modules/products/container/products/products.component'
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
            './modules/product-detail/container/produt-detail/produt-detail.component'
          ).then((c) => c.ProdutDetailComponent),
        providers: [
          provideState(productDetailFeatureKey, productDetailReducer),
          provideEffects(productDetailEffects),
        ],
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import(
            './modules/checkout/container/checkout/checkout.component'
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
