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
  fecha_inicio: string = "";
  fecha_fin: string = "";
  dias: any;
  total_dias: number = 0;
  total_horas: number = 0;
  dias_libres: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private horasProvider: HorasProvider
  ) {}

  ionViewDidEnter(){
   this.limpiar();
  }

  obtener_dias() {
    this.horasProvider.getDias(this.fecha_inicio, this.fecha_fin).then(data => {
      this.dias = data;
      console.log(this.dias);
      this.calcular_dias();
      this.calcular_horas();
      this.calcular_dias_libres();
    });
  }

  calcular_dias() {
    let fechaINI = moment(this.fecha_inicio);
    let fechaFIN = moment(this.fecha_fin);
    this.total_dias = fechaFIN.diff(fechaINI, "days") + 1;
  }

  calcular_horas() {
    this.total_horas = 0;
    this.dias.forEach(element => {
      let comienzo = moment(element.fecha + " " + element.hora_comienzo);
      let final = moment(element.fecha + " " + element.hora_final);
      let horas = final.diff(comienzo, 'hours');
      this.total_horas+=horas;
    });
  }

  calcular_dias_libres(){
    this.dias_libres = this.total_dias-this.dias.length;
  }

  limpiar(){
    this.fecha_inicio = "";
    this.fecha_fin = "";
    this.total_dias = 0;
    this.total_horas = 0;
    this.dias_libres = 0;
    this.dias= undefined;
  }

}
