import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {AngularFirestoreCollection} from 'angularfire2/firestore'
import {ServicioInterface} from "../../models/servicio.interface";
import moment from 'moment';
//import {ServiciosProvider} from "../../providers/servicios/servicios";
import {DatabaseProvider} from "../../providers/database/database";


@IonicPage()
@Component({
  selector: 'page-pagina-servicios',
  templateUrl: 'pagina-servicios.html',
})
export class PaginaServiciosPage {
  fecha = moment().format("YYYY-MM-DD");

  private _COLL: string = "servicios";
  public servicios: any;


  serviciosCollection: AngularFirestoreCollection<ServicioInterface>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private _DB: DatabaseProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.obtener_servicios();
  }

  obtener_servicios(): void {
    this._DB.getServicios(this._COLL, this.fecha)
      .then((data) => {
        this.servicios = data;

      })
      .catch();
  }

  nuevo_servicio() {
   this.navCtrl.push('ServicioModalPage',{fecha: this.fecha, });
  }

  actualizar_servicio (servicio){
    this.navCtrl.push('ServicioModalPage',{fecha: this.fecha, actualizar: true, servicio: servicio });
  }

  eliminar_servicio(servicio): void {
    this._DB.deleteServicio(this._COLL,
      servicio.id)
      .then((data: any) => {
        this.displayAlert('Eliminado', 'El servicio se ha eliminado correctamente');
      })
      .catch((error: any) => {
        this.displayAlert('Error', error.message);
      });
  }

  displayAlert(title: string,
               message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'De acuerdo!',
        handler: () => {
          this.obtener_servicios();
        }
      }]
    });
    alert.present();
  }

}
