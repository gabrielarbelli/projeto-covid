import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartColor } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ExternasService } from '../externas.service';
import { ThousandPlacesPipe } from '../../shared/pipe/thousand-places.pipe';
import { Legenda } from '../../shared/componentes/legenda/legenda';
import { Cores } from '../../shared/enumerable/cores';
import data from '../../../assets/db';

@Component({
  selector: 'app-causas-externas',
  templateUrl: './causas-externas.component.html',
  styleUrls: ['./causas-externas.component.scss']
})
export class CausasExternasComponent implements OnInit, OnChanges {

  @Input() local;
  @Input() mortesCovid;
  @Input() legenda: Legenda[];

  isMobile: boolean = (screen.availWidth < 800);
  mortesAgressao = 0;
  mortesAcidenteTransporte = 0;
  mortesQueda = 0;
  mortesLesao = 0;
  json: Array<any>;
  numberFormat = new ThousandPlacesPipe();

  public barChartOptions: ChartOptions;
  public barChartLabels: Label[];
  public barChartType: ChartType;
  public barChartLegend: boolean;
  public barChartColors: Color[];
  public barChartData: ChartDataSets[];

  constructor(private comparativosService: ExternasService) { }

  ngOnInit(): void {

    if (this.local === true){
      // DEV
      this.comparativosService.getCausasExternas().subscribe((valor: any) => {
        this.json = valor;
        this.calcularObitos();
        this.gerarGrafico();
      });
    } else {
      // PROD
      this.json = data.data_causas_externas;

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
    this.barChartLabels = ['C19', 'A', 'AT', 'Q', 'LI'];
    this.barChartType = 'bar';
    this.barChartLegend = false;

    this.barChartColors = [
      {
        backgroundColor: [Cores.primeiraCor, Cores.segundaCor, Cores.terceiraCor, Cores.quartaCor, Cores.quintaCor],
      }
    ];

    this.barChartData = [
      {
        data:
        [
          this.mortesCovid,
          parseInt(this.mortesAgressao.toFixed(), null),
          parseInt(this.mortesAcidenteTransporte.toFixed(), null),
          parseInt(this.mortesQueda.toFixed(), null),
          parseInt(this.mortesLesao.toFixed(), null)
        ],
        label: 'Mortes'
      }
    ];
  }

  async calcularObitos(): Promise<void> {

    this.mortesAgressao = this.json.reduce((accumulator, current) => {
      return accumulator + current.agressao / this.json.length;
    }, 0);

    this.mortesAcidenteTransporte = this.json.reduce((accumulator, current) => {
      return accumulator + current.acidente_transporte / this.json.length;
    }, 0);

    this.mortesQueda = this.json.reduce((accumulator, current) => {
      return accumulator + current.queda / this.json.length;
    }, 0);

    this.mortesLesao = this.json.reduce((accumulator, current) => {
      return accumulator + current.lesao_involuntaria / this.json.length;
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
        nome: 'A',
        descricao: 'Agressão'
      },
      {
        classeCor: Cores.terceiraCor,
        nome: 'AT',
        descricao: 'Acidente de Transporte'
      },
      {
        classeCor: Cores.quartaCor,
        nome: 'Q',
        descricao: 'Queda'
      },
      {
        classeCor: Cores.quintaCor,
        nome: 'LI',
        descricao: 'Lesão Involuntária'
      }
    ];
  }

}

