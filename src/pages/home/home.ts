import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  paginaPrincipal: any;

  constructor(public navCtrl: NavController) {
    this.paginaPrincipal = TabsPage;
  }
  login() {
    this.navCtrl.push('LoginPage');
  }
  entrar() {
    this.navCtrl.setRoot(this.paginaPrincipal);
  }

}
