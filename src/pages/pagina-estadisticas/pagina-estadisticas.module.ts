import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaEstadisticasPage } from './pagina-estadisticas';

@NgModule({
  declarations: [
    PaginaEstadisticasPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaEstadisticasPage),
  ],
})
export class PaginaEstadisticasPageModule {}
