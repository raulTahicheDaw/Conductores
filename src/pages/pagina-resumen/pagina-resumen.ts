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
    horaComienzo: "",
    horaFinal: "",
    estado: true,
    transfers_1: 0,
    transfers_2: 0,
    transfers_3: 0,
    excursiones: 0,
    otrosServicios: 0,
    turnoPartido: false,
    horasPartido: 0,
    traslados: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private resumenProvider: ResumenDiaProvider,
              private alertCtrl: AlertController) {}


  obtieneDias() {
    this.resumenProvider.getDia(this._DIASCOLL, this.fecha)
    .then(data=>{
      if (data.length > 0){
        this.dia = data[0];
      }else{
        this.displayAlert('INFO', 'No hay datos para ese día');
        this.limpiarCampos();
      }
    })
  }

  limpiarCampos(){
    this.dia.fecha= "";
    this.dia.conductor= "";
    this.dia.horaComienzo= "";
    this.dia.horaFinal= "";
    this.dia.estado= true;
    this.dia.transfers_1= 0;
    this.dia.transfers_2= 0;
    this.dia.transfers_3= 0;
    this.dia.excursiones= 0;
    this.dia.otrosServicios= 0;
    this.dia.turnoPartido= false;
    this.dia.horasPartido= 0;
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
