import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../../shared/services/checkout.service';
import { ProductListComponent } from '../../presentational/product-list/product-list.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly checkoutService = inject(CheckoutService);

  readonly cartProducts = this.checkoutService.cartProducts;

  readonly totalAmount = this.checkoutService.totalAmount;

  onRemoveClicked(index: number): void {
    this.checkoutService.removeFromCart(index);
  }
}
