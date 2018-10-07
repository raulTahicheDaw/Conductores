import {Component} from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams, ViewController} from "ionic-angular";
import {ServicioInterface} from "../../models/servicio.interface";

import {DatabaseProvider} from "../../providers/database/database";


@IonicPage()
@Component({
  selector: "page-servicio-modal",
  templateUrl: "servicio-modal.html"
})
export class ServicioModalPage {

  servicio: ServicioInterface = {
    estado: "pendiente",
    fecha: "",
    hora_fin: "",
    hora_inicio: "",
    lugar_fin: "",
    lugar_inicio: "",
    num_conductor: "",
    orden: "",
    pax: 0,
    tipo: "",
  }

  private _COLL: string = "servicios";

  title: string = 'Añadir Servicio';
  actualizar: boolean = false;

  tipo: string;
  horaComienzo: string;
  lugarComienzo: string;
  lugarFin: string;
  pax: number;
  orden: string;
  fecha: string = '';


  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private _DB: DatabaseProvider) {
    this.clear();
    if (navParams.get('actualizar')) {

      this.servicio = navParams.get('servicio');
      this.title = 'Modificar Servicio';
      this.actualizar = true;
      this.fecha = this.servicio.fecha;
      this.tipo = this.servicio.tipo;
      this.horaComienzo = this.servicio.hora_inicio;
      this.lugarFin = this.servicio.lugar_fin;
      this.lugarComienzo = this.servicio.lugar_inicio;
      this.pax = this.servicio.pax;
      this.orden = this.servicio.orden;
    } else {
      this.fecha = navParams.get("fecha");
    }
  }

  private clear() {
    this.tipo = 'Otro';
    this.horaComienzo = '';
    this.lugarFin = '';
    this.lugarComienzo = ''
    this.pax = 0;
    this.orden = '';
  }

  update() {

    this._DB.updateServicio(this._COLL, this.servicio.id, {
      hora_inicio: this.horaComienzo,
      lugar_fin: this.lugarFin,
      lugar_inicio: this.lugarComienzo,
      orden: this.orden,
      pax: this.pax,
      tipo: this.tipo,
    })
      .then((data) => {
        this.clear();
        this.displayAlert('Correcto', 'El servicio se ha modificado correctamente');
        this.navCtrl.popToRoot();
      })
      .catch((error) => {
        this.displayAlert('Error modificando el servicio', error.message);
      });
  }

  save() {
    this.servicio.fecha = this.fecha;
    this.servicio.hora_inicio = this.horaComienzo;
    this.servicio.lugar_inicio = this.lugarComienzo;
    this.servicio.lugar_fin = this.lugarFin;
    this.servicio.pax = this.pax;
    this.servicio.orden = this.orden;
    this.servicio.hora_fin = "";
    this.servicio.num_conductor = "1";
    this.servicio.estado = "pendiente";
    this.servicio.tipo = this.tipo;

    this._DB.addServicio(this._COLL,
      this.servicio)
      .then((data) => {
        this.displayAlert('Servicio guardado', 'El servicio se guardo correctamente');
        this.clear();
      })
      .catch((error) => {
        this.displayAlert('Error guardando el documento', error.message);
      });
  }

  cancel() {
    this.navCtrl.popToRoot();
  }

  entrada_salida() {
    switch (this.tipo) {
      case "Entrada":
        this.lugarComienzo = "Apto";
        break;
      case "Salida":
        this.lugarFin = "Apto";
        break;
    }
  }

  displayAlert(title: string,
               message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Got it!']
    });
    alert.present();
  }

}
