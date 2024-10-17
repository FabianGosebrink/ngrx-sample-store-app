import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../presentational/product-list/product-list.component';
import { CheckoutStore } from '../../../shared/state/checkout.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly store = inject(CheckoutStore);

  readonly cartProducts = this.store.cartProducts;

  readonly totalAmount = this.store.totalAmount;

  onRemoveClicked(index: number): void {
    this.store.removeProduct(index);
  }
}
