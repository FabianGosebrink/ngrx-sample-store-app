import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProductDetailStore } from '../../state/product-detail.store';
import { CheckoutStore } from '../../../../shared/state/checkout.store';

@Component({
  selector: 'app-produt-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    CategoryNamePipe,
    RouterLink,
    ProductImageComponent,
    ProductInfoComponent,
  ],
  templateUrl: './produt-detail.component.html',
  styleUrl: './produt-detail.component.scss',
  providers: [ProductDetailStore],
})
export class ProdutDetailComponent implements OnInit {
  private readonly store = inject(ProductDetailStore);
  private readonly checkoutStore = inject(CheckoutStore);

  id = input.required<string>();

  readonly product = this.store.product;

  ngOnInit(): void {
    this.store.loadProduct(this.id);
  }

  onAddToCartClicked(product: Product): void {
    this.checkoutStore.addProduct(product);
  }
}
