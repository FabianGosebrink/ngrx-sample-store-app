import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProductDetailService } from '../service/product-detail.service';
import {
  ProductDetailAPIActions,
  ProductDetailUserActions,
} from './product-detail.actions';
import { Product } from '../../../shared/models/product.models';

export const loadProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    productDetailService = inject(ProductDetailService),
  ) =>
    actions$.pipe(
      ofType(ProductDetailUserActions.loadProduct),
      exhaustMap(({ id }) =>
        productDetailService.loadProductDetail(id).pipe(
          map((product: Product | undefined) =>
            ProductDetailAPIActions.loadProductSuccess({ product }),
          ),
          catchError((error) =>
            of(ProductDetailAPIActions.loadProductFailure({ error })),
          ),
        ),
      ),
    ),
  { functional: true },
);
