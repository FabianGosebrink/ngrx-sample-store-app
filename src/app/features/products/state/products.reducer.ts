import { createReducer, on } from '@ngrx/store';
import { initialProductsState } from './products.state';
import { ProductsActions } from './products.actions';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  }))
)
