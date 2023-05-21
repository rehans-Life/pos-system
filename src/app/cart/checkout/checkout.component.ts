import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  cartItems!: Product[];
  total!: number;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartObs.subscribe((items) => {
      this.cartItems = items;
    });

    this.cartService.total.subscribe((total) => {
      this.total = total;
    });
  }
}
