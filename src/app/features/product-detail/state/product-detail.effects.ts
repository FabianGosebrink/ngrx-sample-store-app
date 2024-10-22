import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import { ProductDetailService } from '../service/product-detail.service';
import { ProductDetailActions } from './product-detail.actions';

export const loadProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productDetailService = inject(ProductDetailService),
  ) =>
    actions$.pipe(
      ofType(ProductDetailActions.loadProduct),
      map(({ id }) => id),
      filter(Boolean),
      exhaustMap((id) =>
        productDetailService.loadProductDetail(id).pipe(
          map((product) =>
            ProductDetailActions.loadProductSuccess({ product }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(ProductDetailActions.loadProductFailure({ error })),
          ),
        ),
      ),
    ),
  { functional: true },
);
