import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductCategory } from '../../shared/models/product.models';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Throne of Glass',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/09/57/9781639730957.jpg'
  },
  {
    id: '2',
    name: 'Crown of Midnight',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/09/71/9781639730971.jpg'
  },
  {
    id: '3',
    name: 'Heir of Fire',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/09/95/9781639730995.jpg'
  },
  {
    id: '4',
    name: 'Queen of Shadows',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/10/15/9781639731015.jpg'
  },
  {
    id: '5',
    name: 'Empire of Storms',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/10/39/9781639731039.jpg'
  },
  {
    id: '6',
    name: 'Tower of Dawn',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/10/53/9781639731053.jpg'
  },
  {
    id: '7',
    name: 'Kingdom of Ash',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/10/77/9781639731077.jpg'
  },
  {
    id: '8',
    name: 'The Assassin\'s Blade',
    category: ProductCategory.BOOK_FANTASY,
    price: 30,
    imageUrl: 'https://images.isbndb.com/covers/10/84/9781639731084.jpg'
  },
  {
    id: '9',
    name: 'The Great Empires of the Ancient World',
    category: ProductCategory.BOOK_HISTORY,
    price: 24.9,
    imageUrl: 'https://images.isbndb.com/covers/58/85/9780500295885.jpg'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loadProducts(): Observable<Product[]> {
    console.log('Loaded');
    return of(PRODUCTS);
  }
}
