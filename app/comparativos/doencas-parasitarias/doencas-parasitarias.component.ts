import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartColor } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ComparativosService } from '../comparativos.service';
import { ThousandPlacesPipe } from '../../shared/pipe/thousand-places.pipe';
import { Legenda } from '../../shared/componentes/legenda/legenda';
import { Cores } from '../../shared/enumerable/cores';
import data from '../../../assets/db';

@Component({
  selector: 'app-doencas-parasitarias',
  templateUrl: './doencas-parasitarias.component.html',
  styleUrls: ['./doencas-parasitarias.component.scss']
})
export class DoencasParasitariasComponent implements OnInit, OnChanges {

  @Input() local;
  @Input() mortesCovid;
  @Input() legenda: Legenda[];

  isMobile: boolean = (screen.availWidth < 800);
  mortesAids = 0;
  mortesChagas = 0;
  mortesTuberculose = 0;
  mortesDiarreia = 0;
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
      this.comparativosService.getDoencasParasitarias().subscribe((valor: any) => {
        this.json = valor;
        this.calcularObitos();
        this.gerarGrafico();
      });
    } else {
      // PROD
      this.json = data.data_doencas_parasitarias;

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
    this.barChartLabels = ['C19', 'A', 'C', 'T', 'DG'];
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
          parseInt(this.mortesAids.toFixed(), null),
          parseInt(this.mortesChagas.toFixed(), null),
          parseInt(this.mortesTuberculose.toFixed(), null),
          parseInt(this.mortesDiarreia.toFixed(), null)
        ],
        label: 'Mortes'
      }
    ];
  }

  async calcularObitos(): Promise<void> {

    this.mortesAids = this.json.reduce((accumulator, current) => {
      return accumulator + current.aids / this.json.length;
    }, 0);

    this.mortesChagas = this.json.reduce((accumulator, current) => {
      return accumulator + current.chagas / this.json.length;
    }, 0);

    this.mortesTuberculose = this.json.reduce((accumulator, current) => {
      return accumulator + current.tuberculose / this.json.length;
    }, 0);

    this.mortesDiarreia = this.json.reduce((accumulator, current) => {
      return accumulator + current.diarreia_e_gastroenterite / this.json.length;
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
        descricao: 'Aids'
      },
      {
        classeCor: Cores.terceiraCor,
        nome: 'C',
        descricao: 'Doença de Chagas'
      },
      {
        classeCor: Cores.quartaCor,
        nome: 'T',
        descricao: 'Tuberculose'
      },
      {
        classeCor: Cores.quintaCor,
        nome: 'DG',
        descricao: 'Diarreia e Gastroenterite'
      }
    ];
  }

}
