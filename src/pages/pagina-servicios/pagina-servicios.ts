import { DiaInterface } from "./../../models/dia.interface";
import { LoadingController } from "ionic-angular";

import { Component } from "@angular/core";
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  FabButton
} from "ionic-angular";
import { AngularFirestoreCollection } from "angularfire2/firestore";
import { ServicioInterface } from "../../models/servicio.interface";
import moment from "moment";

import { DatabaseProvider } from "../../providers/database/database";
import { Events } from "ionic-angular";
import { ResumenDiaProvider } from "../../providers/resumen-dia/resumen-dia";

@IonicPage()
@Component({
  selector: "page-pagina-servicios",
  templateUrl: "pagina-servicios.html"
})
export class PaginaServiciosPage {
  showLoading: boolean = true;

  fecha = moment().format("YYYY-MM-DD");

  private _COLL: string = "servicios";
  private _DIASCOLL: string = "dias";

  public servicios: any;

  serviciosPendientes: number = 0;

  serviciosCollection: AngularFirestoreCollection<ServicioInterface>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _DB: DatabaseProvider,
    private alertCtrl: AlertController,
    private events: Events,
    private resumenProvider: ResumenDiaProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter() {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this._DB
      .getServicios(this._COLL, this.fecha)
      .then(data => {
        this.servicios = data;
        this.serviciosPendientes = 0;
        this.servicios.forEach(ele => {
          if (ele.estado == "pendiente") this.serviciosPendientes++;
        });
        this.events.publish("serviciosPendientes", this.serviciosPendientes);
      })
      .catch();
  }

  nuevoServicio(fab) {
    this.navCtrl.push("ServicioModalPage", { fecha: this.fecha });
    fab.close();
  }

  actualizarServicio(servicio) {
    this.navCtrl.push("ServicioModalPage", {
      fecha: this.fecha,
      actualizar: true,
      servicio: servicio
    });
  }

  eliminarServicio(servicio): void {
    this._DB
      .deleteServicio(this._COLL, servicio.id)
      .then((data: any) => {
        this.displayAlert(
          "Eliminado",
          "El servicio se ha eliminado correctamente"
        );
      })
      .catch((error: any) => {
        this.displayAlert("Error", error.message);
      });
  }

  displayAlert(title: string, message: string): void {
    let alert: any = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: "Ok!",
          handler: () => {
            this.obtenerServicios();
          }
        }
      ]
    });
    alert.present();
  }

  cambiarEstado(servicio) {
    let modalCambiarEstado = this.modalCtrl.create("EstadoModalPage", {
      servicio
    });
    modalCambiarEstado.present();
    modalCambiarEstado.onDidDismiss(servicio => {
      console.log(servicio);
      if (servicio != undefined) {
        this._DB
          .updateServicio(this._COLL, servicio.id, servicio)
          .then(response => {
            this.obtenerServicios();
            this.displayAlert(
              "Estado Actualizado",
              "Se ha cambiado el estado correctamente"
            );
          })
          .catch(error => {
            this.displayAlert("Error", "Error Cambiando el estado");
          });
      }
    });
  }

  cerrarDia(fab) {
    fab.close();

    let dia: any = {
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

    const prompt = this.alertCtrl.create({
      title: "Cerrar Dia " + this.fecha,
      message:
        "Introduce la hora de comienzo del día y la hora de finalización.",
      inputs: [
        {
          name: "horaComienzo",
          placeholder: "Hora de comienzo"
        },
        {
          name: "horaFinalizacion",
          placeholder: "Hora de finalización"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Guardar",
          handler: data => {
            this.servicios.forEach((element: ServicioInterface) => {
              switch (element.tipo) {
                case "Entrada":
                case "Salida":
                  const pax = element.pax;
                  switch (true) {
                    case pax >= 3 && pax < 8:
                      dia.transfers_1++;
                      break;
                    case pax < 17:
                      dia.transfers_2++;
                      break;
                    case pax < 100:
                      dia.transfers_3++;
                      break;
                  }
                  break;
                case "Excursion":
                  dia.excursiones++;
                  break;
                case "Traslado":
                  dia.traslados++;
                  break;
                case "Otro":
                  dia.otrosServicios++;
                  break;
                case "Partido":
                  dia.turnoPartido = true;
                  break;
              }
            });
            dia.conductor = "1";
            dia.fecha = this.fecha;
            dia.horaComienzo = data.horaComienzo;
            dia.horaFinal = data.horaFinalizacion;
            this.resumenProvider.addDia(this._DIASCOLL, dia);
          }
        }
      ]
    });
    prompt.present();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
