import { DiaInterface } from './../../models/dia.interface';
import { ResumenDiaProvider } from './../../providers/resumen-dia/resumen-dia';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";

import moment from "moment";

@IonicPage()
@Component({
  selector: "page-pagina-resumen",
  templateUrl: "pagina-resumen.html"
})
export class PaginaResumenPage {

  fecha = '';

  private _DIASCOLL: string = "dias";

  public dia: DiaInterface = {
    fecha: "",
    conductor: "",
    hora_comienzo: "",
    hora_final: "",
    estado: true,
    transfers_1: 0,
    transfers_2: 0,
    transfers_3: 0,
    excursiones: 0,
    otros_servicios: 0,
    turno_partido: false,
    horas_partido: 0,
    traslados: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private resumenProvider: ResumenDiaProvider,
              private alertCtrl: AlertController) {}


  obtiene_dia() {
    this.resumenProvider.getDia(this._DIASCOLL, this.fecha)
    .then(data=>{
      if (data.length > 0){
        this.dia = data[0];
      }else{
        this.displayAlert('INFO', 'No hay datos para ese día');
        this.limpiar_campos();
      }
    })
  }

  limpiar_campos(){
    this.dia.fecha= "";
    this.dia.conductor= "";
    this.dia.hora_comienzo= "";
    this.dia.hora_final= "";
    this.dia.estado= true;
    this.dia.transfers_1= 0;
    this.dia.transfers_2= 0;
    this.dia.transfers_3= 0;
    this.dia.excursiones= 0;
    this.dia.otros_servicios= 0;
    this.dia.turno_partido= false;
    this.dia.horas_partido= 0;
    this.dia.traslados= 0;
  }

  displayAlert(title: string, message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: "Ok!",
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }
}
