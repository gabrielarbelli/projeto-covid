import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import data from '../../assets/db';

@Component({
  selector: 'app-comparativos',
  templateUrl: './comparativos.component.html',
  styleUrls: ['./comparativos.component.scss']
})
export class ComparativosComponent implements OnInit {

  local = false;
  @Input() mortesCovid = 0;
  json: Array<any>;
  casosConfirmados = 0;
  casosRecuperados = 0;
  casosAtivos = 0;
  casosObitos = 0;

  constructor(private router: Router) { }

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
