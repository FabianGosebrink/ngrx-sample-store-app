import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../presentational/header/header.component';
import { CheckoutStore } from '../../../../shared/checkout/state/checkout.store';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  readonly store = inject(CheckoutStore);
}
