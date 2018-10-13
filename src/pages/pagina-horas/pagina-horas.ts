import { HorasProvider } from './../../providers/horas/horas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaginaHorasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagina-horas',
  templateUrl: 'pagina-horas.html',
})
export class PaginaHorasPage {
  fecha_inicio:string = '';
  fecha_fin:string = '';
  dias:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private horasProvider:HorasProvider) {
  }

  obtener_dias(){
    this.horasProvider.getDias(this.fecha_inicio,this.fecha_fin)
    .then(data=>{
      this.dias = data;
      console.log(this.dias);
    })
  }







}
