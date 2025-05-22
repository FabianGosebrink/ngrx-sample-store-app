import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../../models/product.models';
import { computed } from '@angular/core';

export type CheckoutState = {
  cartProducts: Product[];
};

export const initialCheckoutState: CheckoutState = {
  cartProducts: [],
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' },
  withState(initialCheckoutState),
  withComputed((store) => ({
    cartProductsCount: computed(() => store.cartProducts().length),
    totalAmount: computed(() =>
      store.cartProducts().reduce((acc: number, prev) => acc + prev.price, 0),
    ),
  })),
  withMethods((store) => ({
    addProduct: (product: Product) => {
      const cartProducts = [...store.cartProducts(), product];

      patchState(store, { cartProducts });
    },

    removeProduct: (index: number) => {
      const cartProducts = [...store.cartProducts()];

      cartProducts.splice(index, 1);

      patchState(store, { cartProducts });
    },
  })),
);
