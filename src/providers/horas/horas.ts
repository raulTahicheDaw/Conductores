import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import firebase from "firebase";



@Injectable()
export class HorasProvider {
  private _COLL = "dias";

  private _DB: any;

  constructor(public http: HttpClient) {
    // Initialise access to the firestore service
    firebase.firestore().settings({ timestampsInSnapshots: true });
    this._DB = firebase.firestore();
  }

  getDias(fecha_inicio: string, fecha_fin: string) {
    //fecha_inicio = new Date(fecha_inicio);
    //fecha_fin = new Date (fecha_fin);
    return new Promise((resolve, reject) => {
      this._DB
        .collection(this._COLL)
        .where("fecha", ">=", fecha_inicio)
        .where("fecha", "<=", fecha_fin)
        .get()
        .then(querySnapshot => {
          // Declaramos un array donde guardamos los documentos
          let obj: any = [];

          // Iteramos cada documento, recibimos los valores de cada campo
          //le asignamos a cada valor una key y hacemos push al obj[]

          querySnapshot.forEach((doc: any) => {
            obj.push({
              id: doc.id,
              fecha: doc.data().fecha,
              hora_comienzo: doc.data().hora_comienzo,
              hora_final: doc.data().hora_final,
              conductor: doc.data().conductor,
              estado: doc.data().estado,
              transfers_1: doc.data().transfers_1,
              transfers_2: doc.data().transfers_2,
              transfers_3: doc.data().transfers_3,
              excursiones: doc.data().excursiones,
              otros_servicios: doc.data().otros_servicios,
              turno_partido: doc.data().turno_partido,
              horas_partido: doc.data().horas_partido,
              traslados: doc.data().traslados
            });
          });

          // Resolve el array completo obj que contiene todos los valores formateados con sus keys
          // de los documentos de la colleción
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


}
