import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of, reduce, tap, mergeMap } from 'rxjs';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';

interface stat {
  productId: number;
  monthlyData: {
    month: string;
    totalSales: number;
  }[];
}

interface Dataset {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
  fill: string;
}

export interface ChartData {
  datasets: Dataset[];
  labels: string[];
  products: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'assets/productStats.json';
  constructor(private http: HttpClient, private product: ProductsService) {}

  productStats() {
    return this.http.get<stat[]>(this.url).pipe(
      switchMap((stats) =>
        of(...stats).pipe(
          mergeMap((stat) => {
            return this.product
              .product(stat.productId)
              .pipe(map((product) => ({ ...product, ...stat })));
          })
        )
      ),
      reduce(
        (acc: ChartData, curr: stat & Product) => {
          const { datasets, products } = acc;
          for (let i = 0; i < 6; i++) {
            if (datasets[0].data[i] < curr.monthlyData[i].totalSales) {
              datasets[0].data[i] = curr.monthlyData[i].totalSales;
              products[i] = curr.title.substring(0, 20);
            }
          }
          return acc;
        },
        {
          datasets: [
            {
              data: new Array(6).fill(0),
              label: 'Most Sold Products',
              backgroundColor: 'rgba(77,83,96,0.2)',
              borderColor: 'rgba(77,83,96,1)',
              pointBackgroundColor: 'rgba(77,83,96,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(77,83,96,1)',
              fill: 'origin',
            },
          ],
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          products: new Array(6).fill(''),
        }
      )
    );
  }
}
