import { Injectable } from '@angular/core';
import { Domaine } from "../constant/";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  public urlDomaine = '/domaine';
  domaineRef: AngularFireList<Domaine> = null;
  domaineObj: AngularFireObject<any>;

  constructor(
      private angularFireDatabase: AngularFireDatabase
  ) { }

  createDomaine(domaine: Domaine){
    this.domaineRef.push(domaine);
  }

  getDomaineList(): AngularFireList<Domaine>{
    return this.domaineRef = this.angularFireDatabase.list(this.urlDomaine);
  }
}
