import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../shared/pipes/category-name.pipe';
import { CheckoutService } from '../../../shared/services/checkout.service';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProductDetailActions } from '../../state/product-detail.actions';
import { selectProductDetail } from '../../state/product-detail.selectors';

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
})
export class ProdutDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly checkoutService = inject(CheckoutService);

  id = input.required<string>();

  product = this.store.selectSignal(selectProductDetail);

  ngOnInit(): void {
    this.store.dispatch(ProductDetailActions.loadProduct({ id: this.id() }));
  }

  onAddToCartClicked(product: Product): void {
    this.checkoutService.addToCart(product);
  }
}
