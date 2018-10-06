import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaResumenPage } from './pagina-resumen';

@NgModule({
  declarations: [
    PaginaResumenPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaResumenPage),
  ],
})
export class PaginaResumenPageModule {}
