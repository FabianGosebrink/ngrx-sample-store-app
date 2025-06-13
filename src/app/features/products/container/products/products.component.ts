import { Component, inject } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { ProductsStore } from '../../state/products.store';
import { CheckoutStore } from '../../../../shared/checkout/state/checkout.store';

@Component({
  selector: 'app-products',
  imports: [ProductCategoryComponent, CategoryNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsStore],
})
export class ProductsComponent {
  readonly store = inject(ProductsStore);
  private readonly checkoutStore = inject(CheckoutStore);

  onCartClicked(product: Product): void {
    this.checkoutStore.addProduct(product);
  }
}
