import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private readonly http = inject(HttpClient);

  loadProductDetail(id: string): Observable<Product | undefined> {
    return this.http
      .get<Product[]>('http/products.json')
      .pipe(map((products) => products.find((p) => p.id === id)));
  }
}
