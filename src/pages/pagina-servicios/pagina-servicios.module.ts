import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaServiciosPage } from './pagina-servicios';

@NgModule({
  declarations: [
    PaginaServiciosPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaServiciosPage),
  ],
})
export class PaginaServiciosPageModule {}
