import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsResolverService } from './products/products-resolver.service';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';
import { ChartResolverService } from './chart/chart-resolver.service';
import { AuthGuard } from './auth/auth-guard';
import { OrderCompleteComponent } from './cart/order-complete/order-complete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsListComponent,
        canMatch: [AuthGuard],
        resolve: {
          categories: ProductsResolverService.resolveCategories,
          products: ProductsResolverService.resolveProducts,
        },
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canMatch: [AuthGuard],
      },
      {
        path: 'chart',
        component: LineChartComponent,
        canMatch: [AuthGuard],
        resolve: {
          chartData: ChartResolverService.resolve,
        },
      },
      {
        path: 'ordercomplete',
        component: OrderCompleteComponent,
        canMatch: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
