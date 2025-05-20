import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../../shared/models/product.models';
import { HttpErrorResponse } from '@angular/common/http';

export const ProductDetailAPIActions = createActionGroup({
  source: 'Single Product API',
  events: {
    'Load Product Success': props<{ product: Product | undefined }>(),
    'Load Product Failure': props<{ error: HttpErrorResponse }>(),
  },
});

export const ProductDetailUserActions = createActionGroup({
  source: 'Single Product User',
  events: {
    'Load Product': props<{ id: string }>(),
  },
});
