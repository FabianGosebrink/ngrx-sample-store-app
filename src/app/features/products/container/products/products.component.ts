
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';

import { ProductsActions } from '../../state/products.actions';
import { selectProductsByCategories } from '../../state/products.selectors';
import { CheckoutActions } from '../../../../shared/state/checkout.actions';

@Component({
    selector: 'app-products',
    imports: [
    ProductCategoryComponent,
    CategoryNamePipe
],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly store = inject(Store);

  readonly productsByCategories = this.store.selectSignal(
    selectProductsByCategories,
  );

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  onProductClicked(id: string): void {
    this.store.dispatch(ProductsActions.navigateToDetail({ id }));
  }

  onCartClicked(product: Product): void {
    this.store.dispatch(CheckoutActions.addProduct({ product }));
  }
}
