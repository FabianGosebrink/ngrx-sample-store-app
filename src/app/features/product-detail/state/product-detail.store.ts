import { Product } from '../../../shared/models/product.models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { inject } from '@angular/core';
import { ProductDetailService } from '../service/product-detail.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

type ProductDetailState = {
  product: Product | null;
};

const initialProductDetailState: ProductDetailState = {
  product: null,
};

export const ProductDetailStore = signalStore(
  withState<ProductDetailState>(initialProductDetailState),
  withMethods((store, productDetailService = inject(ProductDetailService)) => ({
    loadProduct: rxMethod<string>(
      exhaustMap((id) =>
        productDetailService.loadProductDetail(id).pipe(
          tapResponse({
            next: (product) => patchState(store, { product }),
            error: (error: HttpErrorResponse) =>
              console.error('Error Loading Product Detail', error.message),
          }),
        ),
      ),
    ),
  })),
);
