import { createReducer, on } from '@ngrx/store';
import { initialCheckoutState } from './checkout.state';
import { CheckoutApiActions } from './checkout.actions';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  on(CheckoutApiActions.addProductSuccess, (state, { completeCart }) => ({
    ...state,
    cartProducts: [...completeCart],
  })),

  on(CheckoutApiActions.removeProductSuccess, (state, { index }) => {
    const cartProducts = [...state.cartProducts];

    cartProducts.splice(index, 1);

    return {
      ...state,
      cartProducts,
    };
  }),
);
