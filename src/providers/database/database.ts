import { DiaInterface } from "./../../models/dia.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

// Imports  para firebase
import * as firebase from "firebase";
import "firebase/firestore";

@Injectable()
export class DatabaseProvider {
  private _DB: any;


  constructor(public http: HttpClient) {
    // Initialise access to the firestore service
    firebase.firestore().settings({ timestampsInSnapshots: true });
    this._DB = firebase.firestore();
  }

  getServicios(collectionObj: string, fecha: string): Promise<any> {
    //fecha = new Date(fecha);
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .where("fecha", "==", fecha)
        .orderBy("horaInicio", "asc")
        .get()
        .then(querySnapshot => {
          // Declaramos un array donde guardamos los documentos
          let obj: any = [];

          // Iteramos cada documento, recibimos los valores de cada campo
          //le asignamos a cada valor una key y hacemos push al obj[]

          querySnapshot.forEach((doc: any) => {
            obj.push({
              id: doc.id,
              numConductor: doc.data().numConductor,
              fecha: doc.data().fecha,
              horaInicio: doc.data().horaInicio,
              horaFin: doc.data().horaFin,
              estado: doc.data().estado,
              lugarInicio: doc.data().lugarInicio,
              lugarFin: doc.data().lugarFin,
              orden: doc.data().orden,
              pax: doc.data().pax,
              tipo: doc.data().tipo
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

  addServicio(collectionObj: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  deleteServicio(collectionObj: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateServicio(
    collectionObj: string,
    docID: string,
    dataObj: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}
