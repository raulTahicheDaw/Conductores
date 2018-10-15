import moment from "moment";
import { HorasProvider } from "./../../providers/horas/horas";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";



@IonicPage()
@Component({
  selector: "page-pagina-horas",
  templateUrl: "pagina-horas.html"
})
export class PaginaHorasPage {
  fechaInicio: string = "";
  fechaFin: string = "";
  dias: any;
  totalDias: number = 0;
  totalHoras: number = 0;
  diasLibres: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private horasProvider: HorasProvider
  ) {}

  ionViewDidEnter(){
   this.limpiar();
  }

  obtenerDias() {
    this.horasProvider.getDias(this.fechaInicio, this.fechaFin).then(data => {
      this.dias = data;
      console.log(this.dias);
      this.calcularDias();
      this.calcularHoras();
      this.calcularDiasLibres();
    });
  }

  calcularDias() {
    let fechaINI = moment(this.fechaInicio);
    let fechaFIN = moment(this.fechaFin);
    this.totalDias = fechaFIN.diff(fechaINI, "days") + 1;
  }

  calcularHoras() {
    this.totalHoras = 0;
    this.dias.forEach(element => {
      let comienzo = moment(element.fecha + " " + element.horaComienzo);
      let final = moment(element.fecha + " " + element.horaFinal);
      let horas = final.diff(comienzo, 'hours');
      this.totalHoras+=horas;
    });
  }

  calcularDiasLibres(){
    this.diasLibres = this.totalDias-this.dias.length;
  }

  limpiar(){
    this.fechaInicio = "";
    this.fechaFin = "";
    this.totalDias = 0;
    this.totalHoras = 0;
    this.diasLibres = 0;
    this.dias= undefined;
  }

}
