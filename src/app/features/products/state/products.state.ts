import { Product } from '../../../shared/models/product.models';

export type ProductState = {
  products: Product[];
};

export const initialProductsState: ProductState = {
  products: [],
};
