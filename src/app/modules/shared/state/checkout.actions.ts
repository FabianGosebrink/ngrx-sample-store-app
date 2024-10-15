import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../models/product.models';

export const CheckoutActions = createActionGroup({
  source: '[Checkout]',
  events: {
    'Add Product': props<{ product: Product }>(),
    'Remove Product': props<{ index: number }>(),
  },
});
