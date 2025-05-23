import {
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withLoadingState } from '../../../shared/store-features/loading-state.feature';
import { computed, inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { exhaustMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import {
  Dispatcher,
  eventGroup,
  Events,
  on,
  withEffects,
  withReducer,
} from '@ngrx/signals/events';
import { Product } from '../../../shared/models/product.models';
import { Router } from '@angular/router';

export type ProductState = {
  products: Product[];
  loading: boolean;
};

export const initialProductsState: ProductState = {
  products: [],
  loading: false,
};

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
  withComputed((store) => ({
    productsByCategories: computed(() => {
      const products = store.products();
      const productsByCategory = products.reduce(
        (result: Record<string, Product[]>, product) => {
          const category = product.category;

          if (!result[category]) {
            result[category] = [];
          }

          result[category].push(product);

          return result;
        },
        {},
      );

      const categories = Object.keys(productsByCategory);

      return categories.map((category) => ({
        category,
        products: productsByCategory[category],
      }));
    }),
  })),
  withMethods((_store, router = inject(Router)) => ({
    navigateToDetail: (id: string) => router.navigate(['/products', id]),
  })),
  withHooks({
    onInit(_store, dispatcher = inject(Dispatcher)) {
      dispatcher.dispatch(productEvents.loadProducts());
    },
  }),
);
