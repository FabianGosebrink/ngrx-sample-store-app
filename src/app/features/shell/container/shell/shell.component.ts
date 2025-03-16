import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../presentational/header/header.component';
import { Store } from '@ngrx/store';
import { selectCartProductsCount } from '../../../checkout/state/checkout.selectors';

@Component({
    selector: 'app-shell',
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: './shell.component.html',
    styleUrl: './shell.component.scss'
})
export class ShellComponent {
  private readonly store = inject(Store);

  readonly cartProductsCount = this.store.selectSignal(selectCartProductsCount);
}
