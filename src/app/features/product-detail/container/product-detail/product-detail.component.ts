import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../shared/models/product.models';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { Store } from '@ngrx/store';
import { CheckoutUserActions } from '../../../../shared/checkout/state/checkout.actions';
import { ProductDetailStore } from '../../state/product-detail.store';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductImageComponent, ProductInfoComponent],
  providers: [ProductDetailStore],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  readonly #store = inject(Store);
  readonly productDetailStore = inject(ProductDetailStore);

  id = input.required<string>();

  ngOnInit() {
    this.productDetailStore.loadProduct(this.id);
  }

  onAddToCartClicked(product: Product): void {
    this.#store.dispatch(CheckoutUserActions.addProductToCart({ product }));
  }
}
