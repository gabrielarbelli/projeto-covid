import { Component, OnInit, Input } from '@angular/core';
import data from '../../assets/db';

@Component({
  selector: 'app-externas',
  templateUrl: './externas.component.html',
  styleUrls: ['./externas.component.scss']
})
export class ExternasComponent implements OnInit {

  local = false;
  @Input() mortesCovid = 0;
  casosConfirmados = 0;
  casosRecuperados = 0;
  casosAtivos = 0;
  casosObitos = 0;
  json: Array<any>;

  constructor() { }

  ngOnInit(): void{
    this.buscarDadosCovid();
  }

  async buscarDadosCovid() {

    if (this.local === true) {
      // JSON API no localhost 3000
      const res = await fetch('http://localhost:3000/data_covid_brasil');
      this.json = await res.json();
    } else {
      // JSON API local para publicação
      this.json = data.data_covid_brasil;
    }

    this.mortesCovid = this.json[0].deaths;

    this.casosConfirmados = this.json[0].confirmed;
    this.casosRecuperados = this.json[0].recovered;
    this.casosAtivos = this.json[0].cases;
    this.casosObitos = this.json[0].deaths;
  }

}
