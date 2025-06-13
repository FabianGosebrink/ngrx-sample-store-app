import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions } from './products.actions';
import { initialProductsState } from './products.state';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsApiActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
);
