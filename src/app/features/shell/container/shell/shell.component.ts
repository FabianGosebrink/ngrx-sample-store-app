import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutService } from '../../../../shared/services/checkout.service';
import { HeaderComponent } from '../../presentational/header/header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly checkoutService = inject(CheckoutService);

  readonly cartProductsCount = this.checkoutService.cartProductCount;
}
