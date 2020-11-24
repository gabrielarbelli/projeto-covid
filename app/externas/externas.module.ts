import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternasService } from './externas.service';
import { CausasExternasComponent } from './causas-externas/causas-externas.component';


@NgModule({
  declarations: [CausasExternasComponent],
  imports: [
    CommonModule
  ],
  providers: [
    ExternasService
  ]
})
export class ExternasModule { }
