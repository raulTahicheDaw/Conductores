import moment from "moment";
import { HorasProvider } from "./../../providers/horas/horas";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-pagina-estadisticas",
  templateUrl: "pagina-estadisticas.html"
})
export class PaginaEstadisticasPage {
  mes: any;
  dias: any;

  diasTrabajados: number = 0;
  diasLibres: number = 0;
  mediaHoras: number = 0;
  totalHoras: number = 0;
  totalServicios: number = 0;
  transfers: number = 0;
  traslados: number = 0;
  excursiones: number = 0;
  otrosServicios: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private horasProvider: HorasProvider
  ) {}

  ionViewDidEnter() {
    this.mes = "";
    this.limpiar();
  }

  getDatos() {
    if (this.mes == "") {
      return;
    }
    let ultimoDiaMes = moment(this.mes)
      .endOf("month")
      .format("YYYY-MM-DD");
    let primerDiaMes = moment(this.mes)
      .startOf("month")
      .format("YYYY-MM-DD");

    console.log(primerDiaMes, ultimoDiaMes);

    this.horasProvider.getDias(primerDiaMes, ultimoDiaMes).then(data => {
      this.dias = data;
      console.log(this.dias);
      this.calcula_datos();
    });
  }

  calcula_datos() {
    this.limpiar();

    this.diasTrabajados = this.dias.length;

    if (this.mes != "") {
      this.diasLibres =
        moment(this.mes, "YYYY-MM").daysInMonth() - this.diasTrabajados;
    }

    this.dias.forEach(element => {
      let comienzo = moment(element.fecha + " " + element.horaComienzo);
      let final = moment(element.fecha + " " + element.horaFinal);
      let horas = final.diff(comienzo, "hours");
      this.totalHoras += horas;
      this.transfers += element.transfers_1;
      this.transfers += element.transfers_2;
      this.transfers += element.transfers_3;
      this.traslados += element.traslados;
      this.excursiones += element.excursiones;
      this.otrosServicios += element.otrosServicios;
    });

    if (this.totalHoras != 0 || this.diasTrabajados != 0) {
      this.mediaHoras = this.totalHoras / this.diasTrabajados;
    }
    this.totalServicios =
      this.transfers + this.excursiones + this.traslados + this.otrosServicios;
  }

  limpiar() {
    this.diasTrabajados = 0;
    this.diasLibres = 0;
    this.mediaHoras = 0;
    this.totalHoras = 0;
    this.totalServicios = 0;
    this.transfers = 0;
    this.traslados = 0;
    this.excursiones = 0;
    this.otrosServicios = 0;
  }
}
