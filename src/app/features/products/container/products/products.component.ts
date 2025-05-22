import { Component, inject } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { Store } from '@ngrx/store';
import { CheckoutUserActions } from '../../../../shared/checkout/state/checkout.actions';
import { ProductsStore } from '../../state/products.store';

@Component({
  selector: 'app-products',
  imports: [ProductCategoryComponent, CategoryNamePipe],
  providers: [ProductsStore],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly #store = inject(Store);
  readonly productsStore = inject(ProductsStore);

  onProductClicked(id: string): void {
    this.productsStore.navigateToDetail(id);
  }

  onCartClicked(product: Product): void {
    this.#store.dispatch(CheckoutUserActions.addProductToCart({ product }));
  }
}
