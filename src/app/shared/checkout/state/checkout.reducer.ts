import { createReducer, on } from '@ngrx/store';
import { initialCheckoutState } from './checkout.state';
import { CheckoutApiActions } from './checkout.actions';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  on(
    CheckoutApiActions.addProductSuccess,
    CheckoutApiActions.loadProductsSuccess,
    (state, { products }) => ({
      ...state,
      cartProducts: [...products],
    }),
  ),

  on(CheckoutApiActions.removeProductSuccess, (state, { index }) => {
    const cartProducts = [...state.cartProducts];

    cartProducts.splice(index, 1);

    return {
      ...state,
      cartProducts,
    };
  }),
);
