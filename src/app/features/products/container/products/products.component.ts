
import { Component, inject } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';

import { ProductsStore } from '../../state/products.store';
import { CheckoutStore } from '../../../../shared/state/checkout.store';

@Component({
    selector: 'app-products',
    imports: [
    ProductCategoryComponent,
    CategoryNamePipe
],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    providers: [ProductsStore]
})
export class ProductsComponent {
  private readonly store = inject(ProductsStore);
  private readonly checkoutStore = inject(CheckoutStore);

  readonly productsByCategories = this.store.productsByCategories;

  onProductClicked(id: string): void {
    this.store.navigateToDetail(id);
  }

  onCartClicked(product: Product): void {
    this.checkoutStore.addProduct(product);
  }
}
