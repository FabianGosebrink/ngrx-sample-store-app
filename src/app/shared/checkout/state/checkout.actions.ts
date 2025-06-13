import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product.models';

export const CheckoutUserActions = createActionGroup({
  source: 'Checkout User',
  events: {
    'Add Product': props<{ product: Product }>(),
    'Load Products': emptyProps(),
    'Remove Product': props<{ index: number }>(),
  },
});

export const CheckoutApiActions = createActionGroup({
  source: 'Checkout Api',
  events: {
    'Add Product Success': props<{ products: Product[] }>(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Remove Product Success': props<{ index: number }>(),
  },
});
