import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { CategoryNamePipe } from '../../../../shared/pipes/category-name.pipe';

@Component({
  selector: 'app-product-list-entry',
  standalone: true,
  imports: [NgOptimizedImage, CategoryNamePipe, CurrencyPipe],
  templateUrl: './product-list-entry.component.html',
  styleUrl: './product-list-entry.component.scss',
})
export class ProductListEntryComponent {
  product = input.required<Product>();

  removeClicked = output();

  onRemove(): void {
    this.removeClicked.emit();
  }
}
