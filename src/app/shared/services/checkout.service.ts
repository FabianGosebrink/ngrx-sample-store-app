import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly cartProducts = signal<Product[]>([]);

  readonly cartProductCount = computed(() => this.cartProducts().length);

  readonly totalAmount = computed(() =>
    this.cartProducts().reduce((acc: number, prev) => acc + prev.price, 0),
  );

  addToCart(product: Product): void {
    this.cartProducts.update((products) => [...products, product]);
  }

  removeFromCart(index: number): void {
    this.cartProducts.update((products) => {
      products.splice(index, 1);

      return [...products];
    });
  }
}
