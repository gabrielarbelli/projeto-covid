import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {  ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { CovidComponent } from './covid/covid.component';
import { ObitosComponent } from './covid/obitos/obitos.component';
import { ProporcaoComponent } from './covid/proporcao/proporcao.component';
import { HistoricoComponent } from './covid/historico/historico.component';
import { ComparativosComponent } from './comparativos/comparativos.component';
import { DoencasGravesComponent } from './comparativos/doencas-graves/doencas-graves.component';
import { DoencasParasitariasComponent } from './comparativos/doencas-parasitarias/doencas-parasitarias.component';
import { PandemiasComponent } from './pandemias/pandemias.component';
import { VirusComponent } from './pandemias/virus/virus.component';
import { TragediasComponent } from './pandemias/tragedias/tragedias.component';
import { ExternasComponent } from './externas/externas.component';
import { CausasExternasComponent } from './externas/causas-externas/causas-externas.component';

import { ThousandPlacesPipe } from './shared/pipe/thousand-places.pipe';
import { LegendaComponent } from './shared/componentes/legenda/legenda.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    CovidComponent,
    ObitosComponent,
    ProporcaoComponent,
    HistoricoComponent,
    ComparativosComponent,
    DoencasGravesComponent,
    DoencasParasitariasComponent,
    PandemiasComponent,
    VirusComponent,
    TragediasComponent,
    ExternasComponent,
    CausasExternasComponent,
    ThousandPlacesPipe,
    LegendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
