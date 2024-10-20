import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../shared/pipes/category-name.pipe';
import { CheckoutService } from '../../../shared/services/checkout.service';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProductDetailService } from '../../service/product-detail.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    CategoryNamePipe,
    RouterLink,
    ProductImageComponent,
    ProductInfoComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly productDetailService = inject(ProductDetailService);
  private readonly checkoutService = inject(CheckoutService);

  id = input.required<string>();

  product = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.productDetailService.loadProductDetail(id)),
    ),
  );

  onAddToCartClicked(product: Product): void {
    this.checkoutService.addToCart(product);
  }
}
