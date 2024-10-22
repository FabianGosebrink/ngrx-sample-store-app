import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/models/product.models';
import { ProductListEntryComponent } from '../product-list-entry/product-list-entry.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductListEntryComponent, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products = input.required<Product[]>();

  totalAmount = input.required<number>();

  removeClicked = output<number>();

  onRemoveClicked(index: number): void {
    this.removeClicked.emit(index);
  }
}
