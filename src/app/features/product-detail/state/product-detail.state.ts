import { Product } from '../../../shared/models/product.models';

export const productDetailFeatureKey = 'productDetailFeature';

export type ProductDetailState = {
  product: Product | null;
};

export const initialProductDetailState: ProductDetailState = {
  product: null,
};
