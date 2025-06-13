import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProductsService } from '../service/products.service';
import { ProductsApiActions, ProductsUserActions } from './products.actions';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsUserActions.loadProducts),
      exhaustMap(() =>
        productsService.loadProducts().pipe(
          map((products) =>
            ProductsApiActions.loadProductsSuccess({ products }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(ProductsApiActions.loadProductsFailure({ error })),
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
      exhaustMap(({ id }) => router.navigate(['products', id])),
    ),
  { functional: true, dispatch: false },
);
