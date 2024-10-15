import { createFeatureSelector, createSelector } from '@ngrx/store';
import { checkoutFeatureKey, CheckoutState } from './checkout.state';
import { Product } from '../../shared/models/product.models';

const featureSelector =
  createFeatureSelector<CheckoutState>(checkoutFeatureKey);

export const selectCartProducts = createSelector(
  featureSelector,
  (state) => state.cartProducts,
);

export const selectCartProductsCount = createSelector(
  selectCartProducts,
  (cartProducts) => cartProducts.length,
);

export const selectTotalAmount = createSelector(
  selectCartProducts,
  (cartProducts) =>
    cartProducts.reduce(
      (acc: number, product: Product) => acc + product.price,
      0,
    ),
);
