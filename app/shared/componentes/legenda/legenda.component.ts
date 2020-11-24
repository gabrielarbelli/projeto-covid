import { Component, OnInit, Input } from '@angular/core';
import { Legenda } from './legenda';

@Component({
  selector: 'app-legenda',
  templateUrl: './legenda.component.html',
  styleUrls: ['./legenda.component.scss']
})
export class LegendaComponent implements OnInit {

  @Input() legenda: Legenda[];

  constructor() { }

  ngOnInit(): void {
  }

}
