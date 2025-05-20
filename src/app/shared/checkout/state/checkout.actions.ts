import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../models/product.models';

export const CheckoutUserActions = createActionGroup({
  source: 'Checkout',
  events: {
    'Add Product to Cart': props<{ product: Product }>(),
    'Remove Product from Cart': props<{ index: number }>(),
  },
});
