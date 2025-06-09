import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { map, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly #baseUrl = 'http://localhost:3000/cart/';
  readonly #http = inject(HttpClient);
  readonly #cartProducts = signal<Product[]>([]);

  readonly #cartProductsChanged = new Subject<Product[]>();
  cartProductsChanged = this.#cartProductsChanged.asObservable();

  addToCart(product: Product) {
    return this.#http.post<Product[]>(this.#baseUrl, product).pipe(
      map((products) => {
        this.#cartProductsChanged.next(products);

        return products;
      }),
    );
  }

  getCartProducts() {
    return this.#http
      .get<Product[]>(this.#baseUrl)
      .pipe(tap((products) => this.#cartProducts.set(products)));
  }

  removeFromCart(index: number) {
    return this.#http.delete(this.#baseUrl + index).pipe(
      map(() => {
        this.#cartProducts.update((products) => {
          products.splice(index, 1);

          return [...products];
        });

        this.#cartProductsChanged.next(this.#cartProducts());
      }),
    );
  }
}
