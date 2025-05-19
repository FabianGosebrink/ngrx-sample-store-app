import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';

import { ProductsService } from '../../service/products.service';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../state/products.actions';
import { selectProductsByCategories } from '../../state/products.selectors';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, ProductCategoryComponent, CategoryNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  readonly #store = inject(Store);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);

  readonly productsByCategories =
    this.#store.selectSignal(selectProductsByCategories);

  ngOnInit() {
    this.#store.dispatch(ProductsActions.loadProducts());
  }

  onProductClicked(id: string): void {
    this.router.navigate(['products', id]);
  }

  onCartClicked(product: Product): void {
    this.checkoutService.addToCart(product);
  }
}
