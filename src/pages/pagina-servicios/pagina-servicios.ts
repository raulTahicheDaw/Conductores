import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import {ServicioInterface} from "../../models/servicio.interface";

@IonicPage()
@Component({
  selector: 'page-pagina-servicios',
  templateUrl: 'pagina-servicios.html',
})
export class PaginaServiciosPage {
  fecha: string;
  serviciosCollection: AngularFirestoreCollection<ServicioInterface>;
  servicios: Observable<ServicioInterface[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private asf: AngularFirestore,
              private modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.serviciosCollection = this.asf.collection('servicios');
    this.servicios = this.serviciosCollection.valueChanges();
  }

  nuevo_servicio() {
    let modalNuevoServicio = this.modalCtrl.create("ServicioModalPage", {

    });
    modalNuevoServicio.present();
    modalNuevoServicio.onDidDismiss(servicio => {
    });
  }
}
