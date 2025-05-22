import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../shared/models/product.models';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProductDetailStore } from '../../state/product-detail.store';
import { CheckoutStore } from '../../../../shared/checkout/state/checkout.store';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductImageComponent, ProductInfoComponent],
  providers: [ProductDetailStore],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  readonly productDetailStore = inject(ProductDetailStore);
  readonly checkoutStore = inject(CheckoutStore);

  id = input.required<string>();

  ngOnInit() {
    this.productDetailStore.loadProduct(this.id);
  }

  onAddToCartClicked(product: Product): void {
    this.checkoutStore.addProduct(product);
  }
}
