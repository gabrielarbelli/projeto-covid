import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovidComponent } from './covid/covid.component';
import { ComparativosComponent } from './comparativos/comparativos.component';
import { PandemiasComponent } from './pandemias/pandemias.component';
import { ExternasComponent } from './externas/externas.component';


const routes: Routes = [
  { path: '', redirectTo: '/covid', pathMatch: 'full' },
  { path: 'covid', component: CovidComponent },
  { path: 'comparativos', component: ComparativosComponent },
  { path: 'pandemias', component: PandemiasComponent },
  { path: 'externas', component: ExternasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
