import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { ProductListComponent } from '../../presentational/product-list/product-list.component';
import { Product } from '../../../../shared/models/product.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ProductListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cartProducts = signal<Product[]>([]);
  totalAmount = signal(0);
  private readonly toastrService = inject(ToastrService);
  private readonly checkoutService = inject(CheckoutService);

  ngOnInit(): void {
    this.checkoutService.getCartProducts().subscribe((products) => {
      this.cartProducts.set(products);
      const totalAmount = products.reduce(
        (acc: number, prev) => acc + prev.price,
        0,
      );

      this.totalAmount.set(totalAmount);
    });

    this.checkoutService.cartProductsChanged.subscribe((products) => {
      this.cartProducts.set(products);

      const totalAmount = products.reduce(
        (acc: number, prev) => acc + prev.price,
        0,
      );

      this.totalAmount.set(totalAmount);
    });
  }

  onRemoveClicked(index: number): void {
    this.checkoutService.removeFromCart(index).subscribe(() => {
      this.toastrService.success('Item removed from Cart');
    });
  }
}
