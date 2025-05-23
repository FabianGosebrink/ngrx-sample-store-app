import { signalStore, type, withMethods, withState } from '@ngrx/signals';
import { withProductsSelectors } from './products.selectors';
import { initialProductsState, ProductState } from './products.state';
import { withLoadingState } from '../../../shared/store-features/loading-state.feature';
import { inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { exhaustMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import {
  eventGroup,
  Events,
  on,
  withEffects,
  withReducer,
} from '@ngrx/signals/events';
import { Product } from '../../../shared/models/product.models';
import { Router } from '@angular/router';

export const productEvents = eventGroup({
  source: 'Products',
  events: {
    loadProducts: type<void>(),
    loadProductsSuccess: type<Product[]>(),
    loadProductsFailure: type<any>(),
  },
});

export const ProductsStore = signalStore(
  withState<ProductState>(initialProductsState),
  withLoadingState(),
  withReducer(
    on(productEvents.loadProducts, () => ({ loading: true })),
    on(productEvents.loadProductsSuccess, ({ payload }) => ({
      loading: false,
      products: payload,
    })),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      productsService = inject(ProductsService),
    ) => ({
      loadProducts$: events.on(productEvents.loadProducts).pipe(
        exhaustMap(() =>
          productsService.loadProducts().pipe(
            mapResponse({
              next: (products) => productEvents.loadProductsSuccess(products),
              error: (error) => productEvents.loadProductsFailure(error),
            }),
          ),
        ),
      ),
    }),
  ),
  withProductsSelectors(),
  withMethods(
    (
      store,
      productsService = inject(ProductsService),
      router = inject(Router),
    ) => ({
      // loadProducts: rxMethod<void>(
      //   exhaustMap(() => {
      //     patchState(store, setPending());
      //
      //     return productsService.loadProducts().pipe(
      //       tapResponse({
      //         next: (products) =>
      //           patchState(store, { products }, setFulfilled()),
      //         error: console.error,
      //       }),
      //     );
      //   }),
      // ),

      navigateToDetail: (id: string) => router.navigate(['/products', id]),
    }),
  ),
  // withHooks({
  //   onInit: ({ loadProducts }) => loadProducts(),
  // }),
);
