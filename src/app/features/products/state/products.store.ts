import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../../../shared/models/product.models';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap } from 'rxjs';
import { ProductsService } from '../service/products.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

type ProductsState = {
  products: Product[];
};

const initialProductsState: ProductsState = {
  products: [],
};

export const ProductsStore = signalStore(
  withState<ProductsState>(initialProductsState),
  withComputed((store) => ({
    productsByCategories: computed(() => {
      const products = store.products();
      const productsByCategory = products.reduce(
        (result: Record<string, Product[]>, product: Product) => {
          const { category } = product;
          const resultCategory = result[category] ?? [];

          result[category] = [...resultCategory, product];

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
              error: (error: HttpErrorResponse) =>
                console.error('Failed to load products.', error.message),
            }),
          ),
        ),
      ),

      navigateToDetail: (id: string) => router.navigate(['products', id]),
    }),
  ),
  withHooks({
    onInit: (store) => store.loadProducts(),
  }),
);
