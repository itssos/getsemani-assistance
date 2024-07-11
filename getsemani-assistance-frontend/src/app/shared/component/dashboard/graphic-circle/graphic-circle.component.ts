import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AssistanceService } from '../../../../core/service/assistance.service';

@Component({
  selector: 'app-graphic-circle',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphic-circle.component.html',
  styleUrl: './graphic-circle.component.css'
})
export class GraphicCircleComponent implements OnInit {
  title = 'ng2-charts-demo';
  assistanceCounts: any[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['TARDANZA', 'ASISTIO', 'FALTO'];
  public pieChartDatasets = [{
    data: [0, 0, 0]  // Inicializa con valores por defecto
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private _assistanceService: AssistanceService) {}

  ngOnInit(): void {
    this.fetchAssistanceCounts();
  }

  fetchAssistanceCounts(): void {
    this._assistanceService.getAssistanceCounts().subscribe(
      (data: any) => {
        this.assistanceCounts = data;
        this.updatePieChartData(); 
      },
      (error) => {
        console.error('Error fetching assistance counts:', error);
      }
    );
  }

  updatePieChartData(): void { 
      this.pieChartDatasets[0].data = [
        this.assistanceCounts[0][0],
        this.assistanceCounts[0][1],
        this.assistanceCounts[0][2]
      ];
      if (this.chart) {
        this.chart.update(); 
      }
    
  }
}
