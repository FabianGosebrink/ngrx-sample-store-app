import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsFeatureKey, ProductsState } from './products.state';
import { Product } from '../../../shared/models/product.models';

const featureSelector =
  createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectProducts = createSelector(
  featureSelector,
  (state) => state.products,
);

export const selectProductsByCategories = createSelector(
  selectProducts,
  (products) => {
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
  },
);
