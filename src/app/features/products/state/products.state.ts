import { Product } from '../../../shared/models/product.models';

export const productsFeatureKey = 'productsFeature';

export type ProductsState = {
  products: Product[];
  loading: boolean;
};

export const initialProductsState: ProductsState = {
  products: [],
  loading: false,
};

