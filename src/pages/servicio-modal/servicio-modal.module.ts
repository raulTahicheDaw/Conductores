import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicioModalPage } from './servicio-modal';

@NgModule({
  declarations: [
    ServicioModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicioModalPage),
  ],
})
export class ServicioModalPageModule {}
