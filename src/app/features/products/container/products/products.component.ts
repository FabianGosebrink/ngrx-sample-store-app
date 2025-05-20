import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { Store } from '@ngrx/store';
import { ProductsUserActions } from '../../state/products.actions';
import { selectProductsByCategories } from '../../state/products.selectors';

@Component({
  selector: 'app-products',
  imports: [ProductCategoryComponent, CategoryNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  readonly #store = inject(Store);
  private readonly checkoutService = inject(CheckoutService);

  readonly productsByCategories = this.#store.selectSignal(
    selectProductsByCategories,
  );

  ngOnInit() {
    this.#store.dispatch(ProductsUserActions.loadProducts());
  }

  onProductClicked(id: string): void {
    this.#store.dispatch(ProductsUserActions.navigateToDetail({ id }));
  }

  onCartClicked(product: Product): void {
    this.checkoutService.addToCart(product);
  }
}
