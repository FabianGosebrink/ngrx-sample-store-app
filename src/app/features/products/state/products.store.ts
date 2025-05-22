import { Product } from '../../../shared/models/product.models';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type ProductState = {
  products: Product[];
};

const initialProductsState: ProductState = {
  products: [],
};

export const ProductsStore = signalStore(
  withState<ProductState>(initialProductsState),
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
  withMethods(
    (
      store,
      productsService = inject(ProductsService),
      router = inject(Router),
    ) => ({
      loadProducts: rxMethod<void>(
        exhaustMap(() =>
          productsService.loadProducts().pipe(
            tapResponse({
              next: (products) => patchState(store, { products }),
              error: console.error,
            }),
          ),
        ),
      ),

      navigateToDetail: (id: string) => router.navigate(['/products', id]),
    }),
  ),
  withHooks({
    onInit: ({ loadProducts }) => loadProducts(),
  }),
);
