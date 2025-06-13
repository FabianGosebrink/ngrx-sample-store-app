import { Product } from '../../models/product.models';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CheckoutService } from '../services/checkout.service';

type CheckoutState = {
  products: Product[];
};

const initialCheckoutState: CheckoutState = {
  products: [],
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' },
  withState<CheckoutState>(initialCheckoutState),
  withComputed((store) => ({
    cartProductsCount: computed(() => store.products().length),
    totalAmount: computed(() => {
      const cartProducts = store.products();

      return cartProducts.reduce(
        (acc: number, product: Product) => acc + product.price,
        0,
      );
    }),
  })),
  withMethods((store, checkoutService = inject(CheckoutService)) => ({
    loadAll: rxMethod<void>(
      exhaustMap(() =>
        checkoutService.getCartProducts().pipe(
          tapResponse({
            next: (products) => patchState(store, { products }),
            error: (error: HttpErrorResponse) =>
              console.error('Failed to load product.', error.message),
          }),
        ),
      ),
    ),
    addProduct: rxMethod<Product>(
      exhaustMap((product) =>
        checkoutService.addToCart(product).pipe(
          tapResponse({
            next: (products) => patchState(store, { products }),
            error: (error: HttpErrorResponse) =>
              console.error('Failed to add product.', error.message),
          }),
        ),
      ),
    ),
    removeProduct: rxMethod<number>(
      exhaustMap((index) =>
        checkoutService.removeFromCart(index).pipe(
          tapResponse({
            next: () => {
              const cartProducts = [...store.products()];

              cartProducts.splice(index, 1);

              patchState(store, {
                products: cartProducts,
              });
            },
            error: (error: HttpErrorResponse) =>
              console.error('Failed to remove product.', error.message),
          }),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);
