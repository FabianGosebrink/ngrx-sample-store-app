import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../shared/pipes/category-name.pipe';
import { ProductCategoryComponent } from '../../presentational/product-category/product-category.component';
import { ProductComponent } from '../../presentational/product/product.component';
import { ProductsService } from '../../service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductComponent,
    ProductCategoryComponent,
    CategoryNamePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);

  productCategories$ = this.productsService.loadProducts().pipe(
    map((products) =>
      products.reduce((result: Record<string, Product[]>, product) => {
        const category = product.category;

        if (!result[category]) {
          result[category] = [];
        }

        result[category].push(product);

        return result;
      }, {}),
    ),
    map((products) =>
      Object.keys(products).map((category) => ({
        category,
        products: products[category],
      })),
    ),
  );

  onProductClicked(id: string): void {
    this.router.navigate(['products', id]);
  }

  onCartClicked(id: string): void {
    console.log('Add to Cart', id);
  }
}
