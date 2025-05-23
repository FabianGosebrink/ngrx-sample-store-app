import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { productEvents, ProductsStore } from '../../state/products.store';
import { CheckoutStore } from '../../../../shared/checkout/state/checkout.store';
import { Dispatcher } from '@ngrx/signals/events';

@Component({
  selector: 'app-products',
  imports: [ProductCategoryComponent, CategoryNamePipe],
  providers: [ProductsStore],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  readonly checkoutStore = inject(CheckoutStore);
  readonly productsStore = inject(ProductsStore);
  readonly #dispatcher = inject(Dispatcher);

  ngOnInit() {
    this.#dispatcher.dispatch(productEvents.loadProducts());
  }

  onProductClicked(id: string): void {
    this.productsStore.navigateToDetail(id);
  }

  onCartClicked(product: Product): void {
    this.checkoutStore.addProduct(product);
  }
}
