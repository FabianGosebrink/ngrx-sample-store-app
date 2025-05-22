import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { Product } from '../../../shared/models/product.models';
import { computed } from '@angular/core';
import { ProductState } from './products.state';

export function withProductsSelectors() {
  return signalStoreFeature(
    {
      state: type<ProductState>(),
    },
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
  );
}
