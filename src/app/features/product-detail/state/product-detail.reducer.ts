import { createReducer, on } from '@ngrx/store';
import { ProductDetailAPIActions } from './product-detail.actions';
import { initialProductDetailState } from './product-detail.state';

export const productDetailReducer = createReducer(
  initialProductDetailState,

  on(ProductDetailAPIActions.loadProductSuccess, (state, { product }) => {
    return {
      ...state,
      product: product ?? null,
    };
  }),
);
