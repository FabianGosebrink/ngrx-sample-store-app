import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly #baseUrl = 'http://localhost:3000/cart/';
  readonly #http = inject(HttpClient);

  readonly cartProducts = signal<Product[]>([]);
  readonly cartProductCount = computed(() => this.cartProducts().length);
  readonly totalAmount = computed(() =>
    this.cartProducts().reduce((acc: number, prev) => acc + prev.price, 0),
  );

  addToCart(product: Product) {
    return this.#http
      .post<Product[]>(this.#baseUrl, product)
      .pipe(
        tap(() =>
          this.cartProducts.update((products) => [...products, product]),
        ),
      );
  }

  getCartProducts() {
    return this.#http
      .get<Product[]>(this.#baseUrl)
      .pipe(tap((products) => this.cartProducts.set(products)));
  }

  removeFromCart(index: number) {
    return this.#http.delete(this.#baseUrl + index).pipe(
      map(() => {
        this.cartProducts.update((products) => {
          products.splice(index, 1);

          return [...products];
        });
      }),
    );
  }
}
