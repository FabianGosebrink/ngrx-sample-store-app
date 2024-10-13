import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/models/product.models';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
})
export class ProductCategoryComponent {
  categoryName = input.required<string>();

  products = input.required<Product[]>();

  clicked = output<string>();

  cartClicked = output<Product>();

  onClicked(id: string): void {
    this.clicked.emit(id);
  }

  onCartClicked(product: Product): void {
    this.cartClicked.emit(product);
  }
}
