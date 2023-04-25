import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { AuthService } from '../service/auth.service';
import { DashboardData } from '../models/dashboard-data.model';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { CentroCustoService } from '../service/centro-custo.service';
import { TitulosData } from '../models/titulos-data.model';
import { TitulosComponent }  from '../titulos/titulos.component';
import { TitulosService } from '../service/titulos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  gastosPorCategoria: { [descricao: string]: number } = {};
  @ViewChild('modal') modal!: any;
  @ViewChild(TitulosComponent) titulosComponent!: TitulosComponent;

  constructor(
    private dashboardService: DashboardService,
    private centroCustoService: CentroCustoService,
    private titulosService: TitulosService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
        this.centroCustoService.getCentrocustoData().subscribe(
          data => {
            this.centrocustoData = data;
          },
          error => {
            console.log(error);
          }
        );
        this.titulosService.getTitulosData().subscribe(
          data => {
            this.titulosData = data;
            this.gastosPorCategoria = this.calcularGastosPorCategoria(data);
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

  abrirModalCriarTitulo() {
    if (this.titulosComponent) {
      this.modalService.open(this.titulosComponent.content);
    }
  }

  calcularGastosPorCategoria(titulosData: TitulosData[]): { [descricao: string]: number } {
    const gastos: { [descricao: string]: number } = {};

    titulosData.forEach(titulo => {
      if (titulo.centrosDeCustos) {
        titulo.centrosDeCustos.forEach(centro => {
          const descricao = centro.descricao;

          if (!gastos[descricao]) {
            gastos[descricao] = 0;
          }

          gastos[descricao] += titulo.valor;
        });
      }
    });

    return gastos;
  }
}
