
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../../../shared/models/product.models';

import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProductDetailActions } from '../../state/product-detail.actions';
import { selectProductDetail } from '../../state/product-detail.selectors';
import { CheckoutActions } from '../../../../shared/state/checkout.actions';

@Component({
    selector: 'app-product-detail',
    imports: [
    RouterLink,
    ProductImageComponent,
    ProductInfoComponent
],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private readonly store = inject(Store);

  id = input.required<string>();

  product = this.store.selectSignal(selectProductDetail);

  ngOnInit(): void {
    this.store.dispatch(ProductDetailActions.loadProduct({ id: this.id() }));
  }

  onAddToCartClicked(product: Product): void {
    this.store.dispatch(CheckoutActions.addProduct({ product }));
  }
}
