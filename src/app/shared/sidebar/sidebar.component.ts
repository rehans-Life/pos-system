import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  displaySidebar!: BehaviorSubject<boolean>;
  cartItems!: Observable<Product[]>;
  total!: Observable<number>;

  constructor(public cartService: CartService, public router: Router) {
    this.displaySidebar = this.cartService.displaySidebar;
    this.cartItems = this.cartService.cartObs;
    this.total = this.cartService.total;

    this.cartService.newCart.subscribe(() => {
      this.cartItems = this.cartService.cartObs;
      this.total = this.cartService.total;
    });
  }

  hideSidebar() {
    this.cartService.hideSidebar();
  }

  goToCheckout() {
    this.router.navigateByUrl('/checkout').then(() => {
      this.hideSidebar();
    });
  }
}
