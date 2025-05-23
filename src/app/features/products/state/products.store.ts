import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withProductsSelectors } from './products.selectors';
import { initialProductsState, ProductState } from './products.state';
import {
  setFulfilled,
  setPending,
  withLoadingState,
} from '../../../shared/store-features/loading-state.feature';
import { inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const ProductsStore = signalStore(
  withState<ProductState>(initialProductsState),
  withLoadingState(),
  withProductsSelectors(),
  withMethods(
    (
      store,
      productsService = inject(ProductsService),
      router = inject(Router),
    ) => ({
      loadProducts: rxMethod<void>(
        exhaustMap(() => {
          patchState(store, setPending());

          return productsService.loadProducts().pipe(
            tapResponse({
              next: (products) =>
                patchState(store, { products }, setFulfilled()),
              error: console.error,
            }),
          );
        }),
      ),

      navigateToDetail: (id: string) => router.navigate(['/products', id]),
    }),
  ),
  withHooks({
    onInit: ({ loadProducts }) => loadProducts(),
  }),
);
