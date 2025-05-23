import { Product } from '../../../shared/models/product.models';

export type ProductState = {
  products: Product[];
  loading: boolean;
};

export const initialProductsState: ProductState = {
  products: [],
  loading: false,
};
