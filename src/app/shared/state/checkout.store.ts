import { Product } from '../models/product.models';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

type CheckoutState = {
  cartProducts: Product[];
};

const initialCheckoutState: CheckoutState = {
  cartProducts: [],
};

export const CheckoutStore = signalStore(
  { providedIn: 'root' },
  withState<CheckoutState>(initialCheckoutState),
  withComputed((store) => ({
    cartProductsCount: computed(() => store.cartProducts().length),
    totalAmount: computed(() => {
      const cartProducts = store.cartProducts();

      return cartProducts.reduce(
        (acc: number, product: Product) => acc + product.price,
        0,
      );
    }),
  })),
  withMethods((store) => ({
    addProduct: (product: Product) => {
      const cartProducts = [...store.cartProducts(), product];

      patchState(store, { cartProducts });
    },
    removeProduct: (index: number) => {
      const cartProducts = store.cartProducts();

      cartProducts.splice(index, 1);

      patchState(store, { cartProducts: [...cartProducts] });
    },
  })),
);
