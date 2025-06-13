import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutApiActions, CheckoutUserActions } from './checkout.actions';

export const loadProducts$ = createEffect(
  (actions$ = inject(Actions), checkoutService = inject(CheckoutService)) =>
    actions$.pipe(
      ofType(CheckoutUserActions.loadProducts),
      exhaustMap(() =>
        checkoutService
          .getCartProducts()
          .pipe(
            map((products) =>
              CheckoutApiActions.loadProductsSuccess({ products }),
            ),
          ),
      ),
    ),
  { functional: true },
);

export const addProduct$ = createEffect(
  (actions$ = inject(Actions), checkoutService = inject(CheckoutService)) =>
    actions$.pipe(
      ofType(CheckoutUserActions.addProduct),
      exhaustMap(({ product }) =>
        checkoutService
          .addToCart(product)
          .pipe(
            map((products) =>
              CheckoutApiActions.addProductSuccess({ products }),
            ),
          ),
      ),
    ),
  { functional: true },
);

export const removeProduct$ = createEffect(
  (actions$ = inject(Actions), checkoutService = inject(CheckoutService)) =>
    actions$.pipe(
      ofType(CheckoutUserActions.removeProduct),
      exhaustMap(({ index }) =>
        checkoutService
          .removeFromCart(index)
          .pipe(map(() => CheckoutApiActions.removeProductSuccess({ index }))),
      ),
    ),
  { functional: true },
);
