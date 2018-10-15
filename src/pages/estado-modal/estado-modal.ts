import {Component} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController
} from "ionic-angular";
import {ServicioInterface} from "../../models/servicio.interface";

@IonicPage()
@Component({
  selector: "page-estado-modal",
  templateUrl: "estado-modal.html"
})
export class EstadoModalPage {
  horaInicio: string;
  estado: string;
  horaFin: string = "";
  servicio: ServicioInterface;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    this.servicio = this.navParams.get("servicio");
  }

  save() {
    this.horaInicio = this.servicio.horaInicio;
    if (this.estado == 'terminado' && this.horaFin < this.horaInicio) {
      const toast = this.toastCtrl.create({
        message: "La hora de fin no puede ser anterior al comienzo",
        duration: 2500
      });
      toast.present();
    } else {
      this.servicio.estado = this.estado;
      if (this.estado == 'pendiente' || this.estado == 'cancelado') this.horaFin = '';
      this.servicio.horaFin = this.horaFin;
      this.viewCtrl.dismiss(this.servicio);
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
