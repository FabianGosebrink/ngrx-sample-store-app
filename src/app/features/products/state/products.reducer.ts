import { createReducer, on } from '@ngrx/store';
import { initialProductsState } from './products.state';
import { ProductsActions } from './products.actions';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductsActions.loadProducts, (state, _action) => ({
    ...state,
    loading: true,
  })),
);
