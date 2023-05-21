import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  scan,
  map,
  reduce,
  switchMap,
  of,
  ReplaySubject,
  tap,
  Subject,
} from 'rxjs';
import { Product } from '../products/product';

interface Action {
  product: Product;
  action: 'add' | 'remove';
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  displaySidebar = new BehaviorSubject(false);
  newCart = new Subject();
  cartSub = new ReplaySubject<Action>();
  cartObs!: Observable<Product[]>;
  total!: Observable<number>;

  constructor() {
    this.cartObs = this.cartSub.pipe(
      scan((acc: Product[], curr: Action) => {
        const product = acc.find((product) => product.id === curr.product.id);

        if (!product) {
          return [...acc, { ...curr.product, quantity: 1 }];
        } else {
          if (curr.action === 'remove') {
            if (product.quantity === 1) {
              return acc.filter((product) => product.id !== curr.product.id);
            } else {
              product.quantity -= 1;
            }
          } else {
            product.quantity += 1;
          }
        }
        return acc;
      }, [])
    );

    this.total = this.cartObs.pipe(
      switchMap((products: Product[]) =>
        of(...products).pipe(
          map((product: Product) => product.quantity * product.price),
          reduce((acc: number, curr: number) => acc + curr, 1)
        )
      )
    );
  }

  clearCart() {
    this.cartSub = new ReplaySubject();

    this.cartObs = this.cartSub.pipe(
      scan((acc: Product[], curr: Action) => {
        const product = acc.find((product) => product.id === curr.product.id);

        if (!product) {
          return [...acc, { ...curr.product, quantity: 1 }];
        } else {
          if (curr.action === 'remove') {
            if (product.quantity === 1) {
              return acc.filter((product) => product.id !== curr.product.id);
            } else {
              product.quantity -= 1;
            }
          } else {
            product.quantity += 1;
          }
        }
        return acc;
      }, [])
    );

    this.total = this.cartObs.pipe(
      switchMap((products: Product[]) =>
        of(...products).pipe(
          map((product: Product) => product.quantity * product.price),
          reduce((acc: number, curr: number) => acc + curr, 1)
        )
      )
    );

    this.newCart.next(true);
  }

  addToCart(product: Product) {
    this.cartSub.next({
      product,
      action: 'add',
    });
  }

  removeFromCart(product: Product) {
    this.cartSub.next({
      product,
      action: 'remove',
    });
  }

  showSidebar() {
    this.displaySidebar.next(true);
  }

  hideSidebar() {
    this.displaySidebar.next(false);
  }
}
