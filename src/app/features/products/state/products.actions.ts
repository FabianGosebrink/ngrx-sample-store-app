import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../shared/models/product.models';

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: HttpErrorResponse }>(),
  },
});

export const ProductsUserActions = createActionGroup({
  source: 'Products User',
  events: {
    'Load Products': emptyProps(),
    'Navigate To Detail': props<{ id: string }>(),
  },
});
