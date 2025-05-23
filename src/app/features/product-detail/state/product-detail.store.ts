import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ProductDetailService } from '../service/product-detail.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Product } from '../../../shared/models/product.models';
import { withLoadingState } from '../../../shared/store-features/loading-state.feature';

export type ProductDetailState = {
  product: Product | null;
};

export const initialProductDetailState: ProductDetailState = {
  product: null,
};

export const ProductDetailStore = signalStore(
  withState(initialProductDetailState),
  withLoadingState(),
  withMethods(
    (store, productDetailsService = inject(ProductDetailService)) => ({
      loadProduct: rxMethod<string>(
        exhaustMap((id) =>
          productDetailsService.loadProductDetail(id).pipe(
            tapResponse({
              next: (product) => patchState(store, { product }),
              error: console.error,
            }),
          ),
        ),
      ),
    }),
  ),
);
