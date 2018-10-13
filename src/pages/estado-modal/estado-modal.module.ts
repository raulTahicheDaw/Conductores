import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadoModalPage } from './estado-modal';

@NgModule({
  declarations: [
    EstadoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadoModalPage),
  ],
})
export class EstadoModalPageModule {}
