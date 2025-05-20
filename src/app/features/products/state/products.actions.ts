import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../shared/models/product.models';
import { HttpErrorResponse } from '@angular/common/http';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: HttpErrorResponse }>(),
    'Navigate To Detail': props<{ id: string }>(),
  },
});
