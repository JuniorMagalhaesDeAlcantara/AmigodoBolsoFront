import { Component, Input, OnInit } from '@angular/core';
import { TitulosService } from '../service/titulos.service';
import { TitulosData } from '../models/titulos-data.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafico-centrocusto',
  templateUrl: './grafico-centrocusto.component.html',
  styleUrls: ['./grafico-centrocusto.component.css']
})
export class GraficoCentrocustoComponent implements OnInit {
  titulosData: TitulosData[] = [];

  constructor(private titulosService: TitulosService) { }

  ngOnInit() {
    this.titulosService.getTitulosData().subscribe((data) => {
      const centrosDeCustos: { [descricao: string]: number } = {};
  
      data.forEach(titulo => {
        if (titulo.centrosDeCustos) {
          titulo.centrosDeCustos.forEach(centro => {
            const descricao = centro.descricao;
  
            if (!centrosDeCustos[descricao]) {
              centrosDeCustos[descricao] = 0;
            }
  
            centrosDeCustos[descricao] += titulo.valor;
          });
        }
      });
  
      const labels = Object.keys(centrosDeCustos);
      const dataValues = Object.values(centrosDeCustos);
      const backgroundColors = this.generateColors(labels.length);
  
      const chart = new Chart('myChart', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 20
              }
            }
          },
          cutout: '60%',
          layout: {
            padding: 20
          }
        }
      });
    }, error => {
      console.log(error);
    });
  }
  
  generateColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (i / numColors) * 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  }
}
