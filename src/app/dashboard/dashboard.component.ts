import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { AuthService } from '../service/auth.service';
import { DashboardData } from '../models/dashboard-data.model';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { CentroCustoService } from '../service/centro-custo.service';
import { Chart, registerables } from 'chart.js';
import { GraficoCentrocustoComponent } from '../grafico-centrocusto/grafico-centrocusto.component';

Chart.register(...registerables);

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
dashboardData!: DashboardData;
centrocustoData!: CentrocustoData[];
titulosData!: any[];

constructor(private dashboardService: DashboardService,
private centroCustoService: CentroCustoService) { }

ngOnInit() {
this.dashboardService.getDashboardData().subscribe(
data => {
this.dashboardData = data;
this.centroCustoService. getCentrocustoData().subscribe(
data => {
this.centrocustoData = data;

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
}