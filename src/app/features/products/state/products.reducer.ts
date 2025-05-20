import { createReducer, on } from '@ngrx/store';
import { initialProductsState } from './products.state';
import { ProductsAPIActions, ProductsUserActions } from './products.actions';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsAPIActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),

  on(ProductsUserActions.loadProducts, (state, _action) => ({
    ...state,
    loading: true,
  })),
);
