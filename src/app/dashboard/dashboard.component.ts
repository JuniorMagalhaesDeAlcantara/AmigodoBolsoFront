import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { AuthService } from '../service/auth.service';
import { DashboardData } from '../models/dashboard-data.model';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { CentroCustoService } from '../service/centro-custo.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
dashboardData!: DashboardData;
centrocustoData!: CentrocustoData[];

constructor(private dashboardService: DashboardService,
private centroCustoService: CentroCustoService) { }

ngOnInit() {
this.dashboardService.getDashboardData().subscribe(
data => {
this.dashboardData = data;
this.centroCustoService. getCentrocustoData().subscribe(
data => {
this.centrocustoData = data;
this.createChart();
},
error => {
console.log(error);
}
);
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
  type: 'doughnut',
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  }
});
}
}