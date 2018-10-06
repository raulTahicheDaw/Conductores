import { Component } from "@angular/core";
import { IonicPage, NavParams, ViewController } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-servicio-modal",
  templateUrl: "servicio-modal.html"
})
export class ServicioModalPage {

  tipo: string;
  horaComienzo: any;
  lugarComienzo: string;
  lugarFin: string;
  pax: number;
  orden: string;
  fecha: string;

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {

  }

  save() {
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  entrada_salida() {
    switch (this.tipo) {
      case "entrada":
        this.lugarComienzo = "Apto";
        break;
      case "salida":
        this.lugarFin = "Apto";
        break;
    }
  }
}
