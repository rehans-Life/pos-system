import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CartModule } from './cart/cart.module';
import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from './chart/chart.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    ProductsModule,
    CartModule,
    SharedModule,
    BrowserAnimationsModule,
    ChartModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
