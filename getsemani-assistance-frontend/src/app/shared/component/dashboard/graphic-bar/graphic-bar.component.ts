import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { AssistanceService } from '../../../../core/service/assistance.service';
@Component({
  selector: 'app-graphic-bar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphic-bar.component.html',
  styleUrl: './graphic-bar.component.css'
})
export class GraphicBarComponent implements OnInit{

  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];
  tardinessCounts: any[] = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [0, 0, 0], label: 'Salones' },
    ]
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false
  };

  constructor(private _assistanceService: AssistanceService) {
  }
  ngOnInit(): void {
    this.fetchTardinessCounts();
  }

  fetchTardinessCounts(): void {
    this._assistanceService.getTardinessCounts().subscribe(
      (data: any[]) => {
        this.tardinessCounts = data;
        console.log(data);
        this.updateBarChartData(); 
      },
      (error) => {
        console.error('Error fetching tardiness counts:', error);
      }
    );
  }
  updateBarChartData(): void {
    // Actualiza las etiquetas del gráfico de barras
    this.barChartData.labels = this.tardinessCounts.map(item => item[0]);

    // Actualiza los datos del dataset del gráfico de barras
    const newData = this.tardinessCounts.map(item => item[1]);
    this.barChartData.datasets[0].data = newData;

    if (this.chart) {
      this.chart.update();
    }
  }
}
