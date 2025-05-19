import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ProductsActions } from './products.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(()=>
        productsService.loadProducts()
          .pipe(
            map(products=> ProductsActions.loadProductsSuccess({products})),
            catchError(error=> of(ProductsActions.loadProductsFailure({error})))
          )
      )
  ),
  {functional: true}
);

