import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../shared/models/product.models';
import { productsFeatureKey, ProductsState } from './products.state';

const featureSelector =
  createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectProducts = createSelector(
  featureSelector,
  (state: ProductsState) => state.products,
);

export const selectProductsByCategories = createSelector(
  selectProducts,
  (products) => {
    const productsByCategory = products.reduce(
      (result: Record<string, Product[]>, product) => {
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
  },
);
