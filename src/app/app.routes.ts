import { Routes } from '@angular/router';
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
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import(
            './modules/product-detail/container/produt-detail/produt-detail.component'
          ).then((c) => c.ProdutDetailComponent),
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
