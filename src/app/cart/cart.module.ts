import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CheckoutComponent, OrderCompleteComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [CheckoutComponent, OrderCompleteComponent],
})
export class CartModule {}
