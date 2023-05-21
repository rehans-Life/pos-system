import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from './product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolverService {
  constructor() {}

  static resolveCategories: ResolveFn<string[]> = () => {
    return inject(ProductsService).categories();
  };

  static resolveProducts: ResolveFn<Product[]> = () => {
    return inject(ProductsService).products();
  };
}
