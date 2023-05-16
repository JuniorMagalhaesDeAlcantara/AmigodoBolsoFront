import { Component, Input, OnInit } from '@angular/core';
import { TitulosService } from '../service/titulos.service';
import { TitulosData } from '../models/titulos-data.model';
import { DashboardData } from '../models/dashboard-data.model';
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
    this.generateCentrocustoChart();
    this.generateReceberChart();
    this.generateDespesasChart()
  }

  generateCentrocustoChart() {
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

      const chart = new Chart('centrocustoChart', {
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
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  const value = context.parsed;
                  if (value != null) {
                    label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                    label += ` (${((value / dataValues.reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%)`;
                  }
                  return label;
                }
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

  generateReceberChart() {
    this.titulosService.getTitulosData().subscribe((data) => {
      const datas: Date[] = [];
      const ganhos: number[] = [];

      data.forEach(titulo => {
        if (titulo.tipo === 'ARECEBER' && titulo.centrosDeCustos) {
          const data = titulo.dataCadastro;
          const ganho = titulo.valor;

          datas.push(data);
          ganhos.push(ganho);
        }
      });

      const chart = new Chart('receberChart', {
        type: 'line',
        data: {
          labels: datas,
          datasets: [
            {
              label: 'Evolução dos Ganhos',
              data: ganhos,
              borderColor: 'blue',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Data'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Ganhos'
              }
            }
          }
        }
      });
    }, error => {
      console.log(error);
    });
  }

  generateDespesasChart() {
    this.titulosService.getTitulosData().subscribe((data) => {
      const categorias: string[] = [];
      const valores: number[] = [];

      const despesas = data.filter(titulo => titulo.tipo === 'APAGAR');

      despesas.forEach(titulo => {
        titulo.centrosDeCustos!.forEach(centro => {
          const categoria = centro.descricao;

          const index = categorias.indexOf(categoria);
          if (index === -1) {
            categorias.push(categoria);
            valores.push(titulo.valor);
          } else {
            valores[index] += titulo.valor;
          }
        });
      });

      const backgroundColors = this.generateColors(categorias.length);

      const chart = new Chart('despesasChart', {
        type: 'bar',
        data: {
          labels: categorias,
          datasets: [
            {
              label: 'Despesas por Categoria',
              data: valores,
              backgroundColor: backgroundColors,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Categoria'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Valor'
              }
            }
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