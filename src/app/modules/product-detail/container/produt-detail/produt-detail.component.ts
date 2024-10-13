import { Component, inject, input } from '@angular/core';
import { Product } from '../../../shared/models/product.models';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { ProductDetailService } from '../../service/product-detail.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { CategoryNamePipe } from '../../../shared/pipes/category-name.pipe';
import { RouterLink } from '@angular/router';

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
export class ProdutDetailComponent {
  private readonly productDetailService = inject(ProductDetailService);

  id = input.required<string>();

  product = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.productDetailService.loadProductDetail(id)),
    ),
  );

  onAddToCartClicked(product: Product): void {
    console.log('Added to cart', product);
  }
}
