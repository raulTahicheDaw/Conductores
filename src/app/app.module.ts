import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

//FireBase
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore'


import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PaginaHorasPage} from "../pages/pagina-horas/pagina-horas";
import {PaginaEstadisticasPage} from "../pages/pagina-estadisticas/pagina-estadisticas";
import {PaginaCalendarioPage} from "../pages/pagina-calendario/pagina-calendario";
import {PaginaResumenPage} from "../pages/pagina-resumen/pagina-resumen";
import {PaginaServiciosPage} from "../pages/pagina-servicios/pagina-servicios";
import { DatabaseProvider } from '../providers/database/database';
import { HttpClientModule} from "@angular/common/http";
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import { ResumenDiaProvider } from '../providers/resumen-dia/resumen-dia';
import { HorasProvider } from '../providers/horas/horas';

export const firebaseconfig = {
  apiKey: "AIzaSyB3kWGIZjsQSih-PrECSCx9A0RMmD97_iY",
  authDomain: "conductores-e3236.firebaseapp.com",
  databaseURL: "https://conductores-e3236.firebaseio.com",
  projectId: "conductores-e3236",
  storageBucket: "conductores-e3236.appspot.com",
  messagingSenderId: "31871567817"
};

@NgModule({
  declarations: [
    MyApp,
    PaginaHorasPage,
    PaginaEstadisticasPage,
    PaginaCalendarioPage,
    PaginaResumenPage,
    PaginaServiciosPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
    HttpClientModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PaginaHorasPage,
    PaginaEstadisticasPage,
    PaginaCalendarioPage,
    PaginaResumenPage,
    PaginaServiciosPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    ResumenDiaProvider,
    HorasProvider,

  ]
})
export class AppModule {
}
