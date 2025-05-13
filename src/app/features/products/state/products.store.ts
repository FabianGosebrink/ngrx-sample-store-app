import {
  patchState,
  signalStore, type,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import { Product } from '../../../shared/models/product.models';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { ProductsService } from '../service/products.service';
import { mapResponse, tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { eventGroup, Events, on, withEffects, withReducer } from '@ngrx/signals/events';

type ProductsState = {
  products: Product[];
};

const initialProductsState: ProductsState = {
  products: [],
};

export const productsEvents = eventGroup({
  source: '[Products]',
  events: {
    loadProducts: type<void>(),
    loadProductsSuccess: type<Product[]>(),
  },
});

export const ProductsStore = signalStore(
  withState<ProductsState>(initialProductsState),
  withReducer(
    on(productsEvents.loadProductsSuccess, ({ payload }) => ({
      loading: false,
      products: payload
    })),
  ),
  withEffects(
    (
      store,
      events = inject(Events),
      productsService = inject(ProductsService),
    ) => ({
      loadProducts$: events
        .on(productsEvents.loadProducts)
        .pipe(
          exhaustMap(() =>
            productsService.loadProducts().pipe(
              mapResponse({
                next: (products) =>
                  productsEvents.loadProductsSuccess(products),
                error: (error) =>
                  console.error('Failed to load products.', error),
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
        (result: Record<string, Product[]>, product: Product) => {
          const { category } = product;

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
  withMethods(
    (
      store,
      router = inject(Router),
    ) => ({
      navigateToDetail: (id: string) => router.navigate(['products', id]),
    }),
  ),
);
