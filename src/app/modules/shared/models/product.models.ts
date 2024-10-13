export enum ProductCategory {
  BOOK_FANTASY = 'book_fantasy',
  BOOK_HISTORY = 'book_history',
  BOOK_ROMANCE = 'book_romance',
}

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
};
