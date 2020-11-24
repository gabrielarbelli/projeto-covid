import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartColor } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ComparativosService } from '../comparativos.service';
import { ThousandPlacesPipe } from '../../shared/pipe/thousand-places.pipe';
import { Legenda } from '../../shared/componentes/legenda/legenda';
import { Cores } from '../../shared/enumerable/cores';
import data from '../../../assets/db';

@Component({
  selector: 'app-doencas-graves',
  templateUrl: './doencas-graves.component.html',
  styleUrls: ['./doencas-graves.component.scss']
})
export class DoencasGravesComponent implements OnInit, OnChanges {

  @Input() local;
  @Input() mortesCovid;
  @Input() legenda: Legenda[];

  isMobile: boolean = (screen.availWidth < 800);
  mortesParasitaria = 0;
  mortesNeoplasia = 0;
  mortesCirculatorio = 0;
  json: Array<any>;
  numberFormat = new ThousandPlacesPipe();

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend: boolean;
  public barChartColors: Color[];
  public barChartData: ChartDataSets[];

  constructor(private comparativosService: ComparativosService) { }

  ngOnInit(): void {

    if (this.local === true){
      // DEV
      this.comparativosService.getDoencasGraves().subscribe((valor: any) => {
        this.json = valor;
        this.calcularObitos();
        this.gerarGrafico();
      });
    } else {
      // PROD
      this.json = data.data_doencas_graves;

      this.calcularObitos();
      this.gerarGrafico();

      this.montarLegenda();
    }

  }

  ngOnChanges(): void {
    this.gerarGrafico();
  }

  gerarGrafico(): void {
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        xAxes: [{}],
        yAxes: [{}]
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      },
      tooltips: {
        backgroundColor: 'white',
        titleFontColor: 'black',
        bodyFontColor: 'black',
        callbacks: {
          label: function(tooltipItem, data) {
            const titulo = data.datasets[tooltipItem.datasetIndex].label || '';
            const valor = new ThousandPlacesPipe().transformToNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
            return `${titulo}: ${valor}`;
          }
        }
      }
    };
    this.barChartLabels = ['C19', 'DAC', 'N', 'DP'];
    this.barChartType = 'bar';
    this.barChartLegend = false;

    this.barChartColors = [
      {
        backgroundColor: [Cores.primeiraCor, Cores.segundaCor, Cores.terceiraCor, Cores.quartaCor],
      }
    ];

    this.barChartData = [
      {
        data:
        [
          this.mortesCovid,
          parseInt(this.mortesCirculatorio.toFixed(), null),
          parseInt(this.mortesNeoplasia.toFixed(), null),
          parseInt(this.mortesParasitaria.toFixed(), null)
        ],
        label: 'Mortes'
      }
    ];
  }

  async calcularObitos(): Promise<void> {

    this.mortesParasitaria = this.json.reduce((accumulator, current) => {
      return accumulator + current.parasitarias / this.json.length;
    }, 0);

    this.mortesNeoplasia = this.json.reduce((accumulator, current) => {
      return accumulator + current.neoplasias / this.json.length;
    }, 0);

    this.mortesCirculatorio = this.json.reduce((accumulator, current) => {
      return accumulator + current.aparelho_circulatorio / this.json.length;
    }, 0);

  }

  montarLegenda(): void {
    this.legenda = [
      {
        classeCor: Cores.primeiraCor,
        nome: 'C19',
        descricao: 'Covid-19'
      },
      {
        classeCor: Cores.segundaCor,
        nome: 'DAC',
        descricao: 'Doenças do Aparelho Circulatório'
      },
      {
        classeCor: Cores.terceiraCor,
        nome: 'N',
        descricao: 'Neoplasias (Câncer)'
      },
      {
        classeCor: Cores.quartaCor,
        nome: 'DP',
        descricao: 'Doenças Parasitárias'
      }
    ];
  }

}
