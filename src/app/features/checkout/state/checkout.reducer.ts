import { createReducer, on } from '@ngrx/store';
import { initialCheckoutState } from './checkout.state';
import { CheckoutActions } from '../../../shared/state/checkout.actions';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  on(CheckoutActions.addProduct, (state, { product }) => ({
    ...state,
    cartProducts: [...state.cartProducts, product],
  })),

  on(CheckoutActions.removeProduct, (state, { index }) => {
    const cartProducts = [...state.cartProducts];

    cartProducts.splice(index, 1);

    return {
      ...state,
      cartProducts,
    };
  }),
);
