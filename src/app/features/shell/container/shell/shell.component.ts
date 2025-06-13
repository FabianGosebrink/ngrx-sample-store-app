import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../presentational/header/header.component';
import { Store } from '@ngrx/store';
import { selectCartProductsCount } from '../../../../shared/state/checkout.selectors';
import { CheckoutUserActions } from '../../../../shared/state/checkout.actions';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  private readonly store = inject(Store);

  readonly cartProductsCount = this.store.selectSignal(selectCartProductsCount);

  ngOnInit(): void {
    this.store.dispatch(CheckoutUserActions.loadProducts());
  }
}
