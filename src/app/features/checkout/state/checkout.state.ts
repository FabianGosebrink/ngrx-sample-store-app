import { Product } from '../../../shared/models/product.models';

export const checkoutFeatureKey = 'checkout';

export type CheckoutState = {
  cartProducts: Product[];
};

export const initialCheckoutState: CheckoutState = {
  cartProducts: [],
};
