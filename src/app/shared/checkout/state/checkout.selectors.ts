import { createFeatureSelector, createSelector } from '@ngrx/store';
import { checkoutFeatureKey, CheckoutState } from './checkout.state';

const featureSelector =
  createFeatureSelector<CheckoutState>(checkoutFeatureKey);

export const selectCartProducts = createSelector(
  featureSelector,
  (state) => state.cartProducts,
);

export const selectCartProductCount = createSelector(
  selectCartProducts,
  (products) => products.length,
);

export const selectTotalAmount = createSelector(
  selectCartProducts,
  (products) => products.reduce((acc: number, prev) => acc + prev.price, 0),
);
