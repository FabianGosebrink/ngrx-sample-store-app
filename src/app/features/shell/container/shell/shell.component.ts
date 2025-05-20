import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../presentational/header/header.component';
import { Store } from '@ngrx/store';
import { selectCartProductCount } from '../../../../shared/checkout/state/checkout.selectors';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  readonly #store = inject(Store);

  readonly cartProductsCount = this.#store.selectSignal(selectCartProductCount);
}
