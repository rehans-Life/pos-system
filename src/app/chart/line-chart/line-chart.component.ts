import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  public lineChartData!: ChartConfiguration['data'];
  public lineChartType: ChartType = 'line';
  mostSoldProducts: string[] = [];
  labels: string[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private route: ActivatedRoute) {
    Chart.register(Annotation);
    this.route.data.subscribe(({ chartData }) => {
      this.lineChartData = chartData;
      this.lineChartOptions = {
        responsive: true,
        elements: {
          line: {
            tension: 0.5,
          },
        },
        plugins: {
          legend: { display: true },
          annotation: {
            annotations: chartData.products.map(
              (product: string, index: number) => {
                return {
                  type: 'line',
                  scaleID: 'x',
                  value: chartData.labels[index],
                  borderColor: 'black',
                  borderWidth: 2,
                  label: {
                    display: true,
                    position: 'center',
                    color: 'white',
                    content: product,
                    size: 12,
                    font: {
                      size: '12px',
                      weight: 'light',
                    },
                  },
                };
              }
            ),
          },
        },
      };
    });
  }

  public lineChartOptions!: ChartConfiguration['options'];
}
