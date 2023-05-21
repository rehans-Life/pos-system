import { Injectable, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ChartData, DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ChartResolverService {
  constructor() {}

  static resolve: ResolveFn<ChartData> = () => {
    return inject(DataService).productStats();
  };
}
