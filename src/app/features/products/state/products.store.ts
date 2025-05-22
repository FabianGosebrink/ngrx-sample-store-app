import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withProductsSelectors } from './products.selectors';
import { withProductsMethods } from './products.methods';
import { initialProductsState, ProductState } from './products.state';

export const ProductsStore = signalStore(
  withState<ProductState>(initialProductsState),
  withProductsSelectors(),
  withProductsMethods(),
  withHooks({
    onInit: ({ loadProducts }) => loadProducts(),
  }),
);
