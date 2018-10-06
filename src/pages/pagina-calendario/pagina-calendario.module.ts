import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaCalendarioPage } from './pagina-calendario';

@NgModule({
  declarations: [
    PaginaCalendarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaCalendarioPage),
  ],
})
export class PaginaCalendarioPageModule {}
