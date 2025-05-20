import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ProductsAPIActions, ProductsUserActions } from './products.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Router } from '@angular/router';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsUserActions.loadProducts),
      exhaustMap(() =>
        productsService.loadProducts().pipe(
          map((products) =>
            ProductsAPIActions.loadProductsSuccess({ products }),
          ),
          catchError((error) =>
            of(ProductsAPIActions.loadProductsFailure({ error })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const navigateToDetail$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(ProductsUserActions.navigateToDetail),
      exhaustMap(({ id }) => router.navigate(['/products', id])),
    ),
  { functional: true, dispatch: false },
);
