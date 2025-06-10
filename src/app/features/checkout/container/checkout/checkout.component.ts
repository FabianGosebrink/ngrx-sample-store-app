import { Component, inject, OnInit } from '@angular/core';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { ProductListComponent } from '../../presentational/product-list/product-list.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ProductListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly checkoutService = inject(CheckoutService);
  private readonly toastrService = inject(ToastrService);

  readonly cartProducts = this.checkoutService.cartProducts;

  readonly totalAmount = this.checkoutService.totalAmount;

  ngOnInit(): void {
    this.checkoutService.getCartProducts();
  }

  onRemoveClicked(index: number): void {
    this.checkoutService.removeFromCart(index).subscribe(() => {
      this.toastrService.success('Item removed from Cart');
    });
  }
}
