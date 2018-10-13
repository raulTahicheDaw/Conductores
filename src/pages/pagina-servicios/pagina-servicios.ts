import { DiaInterface } from "./../../models/dia.interface";
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
  fecha = moment().format("YYYY-MM-DD");

  private _COLL: string = "servicios";
  private _DIASCOLL: string = 'dias';

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
    private resumenProvider: ResumenDiaProvider
  ) {}

  ionViewDidEnter() {
    this.obtener_servicios();
  }

  obtener_servicios(): void {
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

  nuevo_servicio(fab) {
    this.navCtrl.push("ServicioModalPage", { fecha: this.fecha });
    fab.close();
  }

  actualizar_servicio(servicio) {
    this.navCtrl.push("ServicioModalPage", {
      fecha: this.fecha,
      actualizar: true,
      servicio: servicio
    });
  }

  eliminar_servicio(servicio): void {
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
            this.obtener_servicios();
          }
        }
      ]
    });
    alert.present();
  }

  cambiar_estado(servicio) {
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
            this.obtener_servicios();
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

  cerrar_dia(fab) {
    fab.close();

    let dia: DiaInterface = {
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

    const prompt = this.alertCtrl.create({
      title: "Cerrar Dia " + this.fecha,
      message:
        "Introduce la hora de comienzo del día y la hora de finalización.",
      inputs: [
        {
          name: "hora_comienzo",
          placeholder: "Hora de comienzo"
        },
        {
          name: "hora_finzalizacion",
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
                  dia.otros_servicios++;
                  break;
                case "Partido":
                  dia.turno_partido = true;
                  break;
              }
            });
            dia.conductor = "1";
            dia.fecha = this.fecha;
            dia.hora_comienzo = data.hora_comienzo;
            dia.hora_final = data.hora_finzalizacion;
            this.resumenProvider.addDia(this._DIASCOLL, dia);
          }
        }
      ]
    });
    prompt.present();
  }
}
