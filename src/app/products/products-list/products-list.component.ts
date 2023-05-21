import { Component } from '@angular/core';
import { Params, ProductsService } from '../products.service';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  categories!: string[];
  products!: Product[];

  paramsForm = new FormGroup({
    category: new FormControl(''),
    sort: new FormControl('asc'),
  });

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  addToCart(id: number) {
    this.cartService.showSidebar();
    this.cartService.addToCart(this.products[id - 1]);
  }

  ngOnInit() {
    this.route.data.subscribe(({ categories, products }) => {
      this.categories = categories;
      this.products = products;
    });

    this.paramsForm.valueChanges
      .pipe(
        map((params): Params => {
          return {
            category: params.category || '',
            sort: params.sort || 'asc',
          };
        }),
        switchMap((params: Params) => this.productsService.products(params))
      )
      .subscribe((products) => {
        this.products = products;
      });
  }
}
