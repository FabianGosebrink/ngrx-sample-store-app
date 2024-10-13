import { Pipe, PipeTransform } from '@angular/core';
import { ProductCategory } from '../../shared/models/product.models';

const CATEGORY_NAME_MAP: Record<ProductCategory, string> = {
  [ProductCategory.BOOK_FANTASY]: 'Fantasy Books',
  [ProductCategory.BOOK_HISTORY]: 'History Books',
  [ProductCategory.BOOK_ROMANCE]: 'Romance Books'
}

@Pipe({
  name: 'categoryName',
  standalone: true
})
export class CategoryNamePipe implements PipeTransform {

  transform(value: string): string {
    return CATEGORY_NAME_MAP[value as ProductCategory] ?? '';
  }

}
