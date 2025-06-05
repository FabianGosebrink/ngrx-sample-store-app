import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { ProductListComponent } from '../../presentational/product-list/product-list.component';
import { Product } from '../../../../shared/models/product.models';

@Component({
  selector: 'app-checkout',
  imports: [ProductListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly checkoutService = inject(CheckoutService);

  cartProducts = signal<Product[]>([])
  totalAmount = signal(0);



  ngOnInit(): void {
    this.checkoutService.getCartProducts().subscribe((products) => {
      this.cartProducts.set(products);
      const totalAmount = products.reduce((acc: number, prev) => acc + prev.price, 0);

      this.totalAmount.set(totalAmount);
    });
  }

  onRemoveClicked(index: number): void {
    this.checkoutService.removeFromCart(index);
  }
}
