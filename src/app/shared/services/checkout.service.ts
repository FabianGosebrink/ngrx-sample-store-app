import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { map, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly #cartProductsChanged = new Subject<Product[]>();
  readonly #cartProducts = signal<Product[]>([]);

  cartProductsChanged = this.#cartProductsChanged.asObservable();

  addToCart(product: Product) {
    return timer(1000).pipe(
      map(() => {
        this.#cartProducts.update((products) => [...products, product]);

        this.#cartProductsChanged.next(this.#cartProducts());
        return product;
      }),
    );
  }

  getCartProducts() {
    return timer(1000).pipe(map(() => this.#cartProducts()));
  }

  removeFromCart(index: number) {
    return timer(1000).pipe(
      map(() => {
        this.#cartProducts.update((products) => {
          products.splice(index, 1);

          return [...products];
        });

        return this.#cartProducts();
      }),
    );
  }
}
