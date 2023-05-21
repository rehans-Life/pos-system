import { Component, Inject } from '@angular/core';
import { localStorageToken } from 'src/app/localstoragetoken';
import { MailService } from '../mail.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css'],
})
export class OrderCompleteComponent {
  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private cart: CartService,
    private mail: MailService
  ) {}

  ngOnInit() {
    this.cart.clearCart();
    this.mail.sendEmail(this.localStorage.getItem('email'));
  }
}
