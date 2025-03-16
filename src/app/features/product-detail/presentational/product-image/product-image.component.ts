import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-product-image',
    imports: [NgOptimizedImage],
    templateUrl: './product-image.component.html',
    styleUrl: './product-image.component.scss'
})
export class ProductImageComponent {
  imageUrl = input.required<string>();
}
