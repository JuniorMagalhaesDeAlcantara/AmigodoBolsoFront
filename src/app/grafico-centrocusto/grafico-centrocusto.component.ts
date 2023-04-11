import { Component, OnInit } from '@angular/core';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { CentroCustoService } from '../service/centro-custo.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafico-centrocusto',
  templateUrl: './grafico-centrocusto.component.html',
  styleUrls: ['./grafico-centrocusto.component.css']
})
export class GraficoCentrocustoComponent implements OnInit {
  centrocustoData!: CentrocustoData[];

  constructor(private  centrocustoService: CentroCustoService) { }

  ngOnInit(): void {
    this.centrocustoService.getCentrocustoData().subscribe(
      (data: CentrocustoData[]) => {
        this.centrocustoData = data;
        this.createChart();
      },
      error => {
        console.log(error);
      }
    );
  }

  createChart(): void {
    const labels = this.centrocustoData.map(x => x.descricao);
    const data = this.centrocustoData.map(x => x.id);

    const chart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Centros de Custo',
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#00FF7F',
              '#6B8E23',
              '#00FA9A',
              '#7B68EE',
              '#FF69B4',
              '#FFD700',
              '#CD5C5C'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}