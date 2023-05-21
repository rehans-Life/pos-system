import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

export interface Params {
  category: string;
  sort: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'https://fakestoreapi.com';

  productsSub = new BehaviorSubject({
    category: '',
    sort: 'asc',
  });

  constructor(private http: HttpClient) {}

  categories() {
    return this.http.get<string[]>(`${this.url}/products/categories`);
  }

  product(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }

  products({ category, sort }: Params = { category: '', sort: 'asc' }) {
    const params = new HttpParams().set('sort', sort);

    if (!category) {
      return this.http.get<Product[]>(`${this.url}/products`, { params });
    } else {
      return this.http.get<Product[]>(
        `${this.url}/products/category/${category}`,
        { params }
      );
    }
  }
}
