import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly #baseUrl = 'http://localhost:3000/cart/';
  readonly #http = inject(HttpClient);

  addToCart(product: Product) {
    return this.#http.post<Product[]>(this.#baseUrl, product);
  }

  getCartProducts() {
    return this.#http.get<Product[]>(this.#baseUrl);
  }

  removeFromCart(index: number) {
    return this.#http.delete(this.#baseUrl + index);
  }
}
