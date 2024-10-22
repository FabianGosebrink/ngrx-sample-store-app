import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';
import { initialProductsState } from './products.state';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
);
