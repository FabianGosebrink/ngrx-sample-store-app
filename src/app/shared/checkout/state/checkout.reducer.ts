import { createReducer, on } from '@ngrx/store';
import { initialCheckoutState } from './checkout.state';
import { CheckoutUserActions } from './checkout.actions';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  on(CheckoutUserActions.addProductToCart, (state, { product }) => ({
    ...state,
    cartProducts: [...state.cartProducts, product],
  })),

  on(CheckoutUserActions.removeProductFromCart, (state, { index }) => {
    const cartProducts = [...state.cartProducts];
    cartProducts.splice(index, 1);

    return {
      ...state,
      cartProducts,
    };
  }),
);
