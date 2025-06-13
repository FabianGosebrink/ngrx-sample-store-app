import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private readonly http = inject(HttpClient);

  loadProductDetail(id: string): Observable<Product> {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }
}
