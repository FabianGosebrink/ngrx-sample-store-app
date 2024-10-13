import { Routes } from '@angular/router';
import { ShellComponent } from './modules/shell/container/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'products',
        loadComponent: () => import('./modules/products/container/products/products.component').then((c) => c.ProductsComponent)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'products'
      }
    ]
  }
];
