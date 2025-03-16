import { Component, output } from '@angular/core';

@Component({
    selector: 'app-add-to-cart-button',
    imports: [],
    templateUrl: './add-to-cart-button.component.html',
    styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  clicked = output();

  onClick(): void {
    this.clicked.emit();
  }
}
