import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { PaginaServiciosPage } from "../pagina-servicios/pagina-servicios";
import { PaginaCalendarioPage } from "../pagina-calendario/pagina-calendario";
import { PaginaEstadisticasPage } from "../pagina-estadisticas/pagina-estadisticas";
import { PaginaHorasPage } from "../pagina-horas/pagina-horas";
import { PaginaResumenPage } from "../pagina-resumen/pagina-resumen";
import { Events } from "ionic-angular";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  paginaServicios: any;
  paginaCalendario: any;
  paginaEstadisticas: any;
  paginaHoras: any;
  paginaResumen: any;
  tab1Root = HomePage;

  serviciosPendientes: number;

  constructor(public events: Events) {
    this.paginaServicios = PaginaServiciosPage;
    this.paginaCalendario = PaginaCalendarioPage;
    this.paginaEstadisticas = PaginaEstadisticasPage;
    this.paginaHoras = PaginaHorasPage;
    this.paginaResumen = PaginaResumenPage;
    this.events.subscribe("serviciosPendientes", servicios => {
      this.serviciosPendientes = servicios;
    });
  }

}
