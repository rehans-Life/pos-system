import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [LineChartComponent],
  imports: [CommonModule, HttpClientModule, NgChartsModule],
  exports: [LineChartComponent],
})
export class ChartModule {}
