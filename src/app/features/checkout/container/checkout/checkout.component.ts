import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../presentational/product-list/product-list.component';
import { Store } from '@ngrx/store';
import {
  selectCartProducts,
  selectTotalAmount,
} from '../../../../shared/checkout/state/checkout.selectors';
import { CheckoutUserActions } from '../../../../shared/checkout/state/checkout.actions';

@Component({
  selector: 'app-checkout',
  imports: [ProductListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  readonly #store = inject(Store);

  readonly cartProducts = this.#store.selectSignal(selectCartProducts);

  readonly totalAmount = this.#store.selectSignal(selectTotalAmount);

  onRemoveClicked(index: number): void {
    this.#store.dispatch(CheckoutUserActions.removeProductFromCart({ index }));
  }
}
