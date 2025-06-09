import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { HeaderComponent } from '../../presentational/header/header.component';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  cartProductsCount = signal(0);
  private readonly checkoutService = inject(CheckoutService);

  ngOnInit() {
    this.checkoutService.getCartProducts().subscribe((products) => {
      this.cartProductsCount.set(products.length);
    });

    this.checkoutService.cartProductsChanged.subscribe((products) => {
      this.cartProductsCount.set(products.length);
    });
  }
}
