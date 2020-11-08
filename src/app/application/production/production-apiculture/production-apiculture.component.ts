import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material/table';
import { DatatableLanguage } from "../../../constant";
import { ExploitantDetailComponent } from '../../exploitant/exploitant-detail/exploitant-detail.component';
import { ModalService, DomaineService } from '../../../services';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-apiculture',
  templateUrl: './production-apiculture.component.html',
  styleUrls: ['./production-apiculture.component.css']
})
export class ProductionApicultureComponent implements OnInit {

  public dtOptions: any = {}

  number: any

  alertLoading: string
  loading: any

  public listData: MatTableDataSource<any>
  domaines: any
  public dtTigger = new Subject()

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private modalService: ModalService,
    public domaineService: DomaineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: DatatableLanguage.datatableFrench
    }

    this.loading = true

    this.loadData()
    this.loadDomaineList()

    if (this.loading == true) {
      setTimeout(() => {
        this.alertLoading = 'Vérifiez l\'état de votre connexion internet'
      }, 60000)
    }
  }

  loadDomaineList() {
    this.domaineService.getDomaineList()
      .snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(domaines => {
        this.domaines = domaines
      })
  }

  // culture maréchaire initiale
  loadData(): any {
    const array = []
    const exploitant = this.angularFireDatabase.database.ref().child('exploitants')
    const marketCulture = this.angularFireDatabase.database.ref().child('Apiculture')

    exploitant.on('child_added', snap => {
      const exploitantId = snap.val().exploitantId
      const exploitantFirstName = snap.val().exploitantFirstName
      const exploitantLastName = snap.val().exploitantLastName
      const exploitantCedar = snap.val().exploitantCedar
      const exploitantDate = snap.val().exploitantDate
      const exploitantSex = snap.val().exploitantSex
      const exploitantDomaine = snap.val().exploitantDomaine
      const exploitantAge = snap.val().exploitantAge
      const exploitantCommune = snap.val().exploitantCommune
      const exploitantDistrict = snap.val().exploitantDistrict
      const exploitantFokotany = snap.val().exploitantFokotany
      const exploitantRegion = snap.val().exploitantRegion
      const exploitantActivite1 = snap.val().exploitantActivite1
      const exploitantActivite2 = snap.val().exploitantActivite2
      const exploitantSpeciality1 = snap.val().exploitantSpeciality1
      const exploitantSpeciality2 = snap.val().exploitantSpeciality2
      const exploitantFormation = snap.val().exploitantFormation
      const exploitantSchooling = snap.val().exploitantSchooling

      marketCulture.orderByChild('exploitantId').equalTo(exploitantId).on('value', snapshot => {
        snapshot.forEach((res: any) => {
          array.push({
            exploitantId,
            exploitantFirstName,
            exploitantLastName,
            exploitantCedar,
            exploitantDate,
            exploitantSex,
            exploitantDomaine,
            exploitantAge,
            exploitantCommune,
            exploitantDistrict,
            exploitantFokotany,
            exploitantRegion,
            exploitantActivite1,
            exploitantActivite2,
            exploitantSpeciality1,
            exploitantSpeciality2,
            exploitantFormation,
            exploitantSchooling,
            ...res.val()
          })

          this.listData = new MatTableDataSource<any>(array)
          
          this.number = this.listData.filteredData.length
          // this.dtTigger.next()
          console.log('marketProduction', this.listData.filteredData)
          this.loading = false
        })
      })
    })
  }

  selectCedar(arg) {
    const array = [];
    const exploitant = this.angularFireDatabase.database.ref().child('exploitants');
    const cedar = this.angularFireDatabase.database.ref().child('Apiculture');

    exploitant.on('child_added', snap => {
      const exploitantId = snap.val().exploitantId
      const exploitantFirstName = snap.val().exploitantFirstName
      const exploitantLastName = snap.val().exploitantLastName
      const exploitantCedar = snap.val().exploitantCedar
      const exploitantDate = snap.val().exploitantDate
      const exploitantSex = snap.val().exploitantSex
      const exploitantDomaine = snap.val().exploitantDomaine
      const exploitantAge = snap.val().exploitantAge
      const exploitantCommune = snap.val().exploitantCommune
      const exploitantDistrict = snap.val().exploitantDistrict
      const exploitantFokotany = snap.val().exploitantFokotany
      const exploitantRegion = snap.val().exploitantRegion
      const exploitantActivite1 = snap.val().exploitantActivite1
      const exploitantActivite2 = snap.val().exploitantActivite2
      const exploitantSpeciality1 = snap.val().exploitantSpeciality1
      const exploitantSpeciality2 = snap.val().exploitantSpeciality2
      const exploitantFormation = snap.val().exploitantFormation
      const exploitantSchooling = snap.val().exploitantSchooling

      cedar.orderByChild('exploitantId').equalTo(exploitantId).on('value', snapshot => {
        snapshot.forEach(cedarData => {
          if (exploitantCedar === arg) {
            array.push({
              exploitantId,
              exploitantFirstName,
              exploitantLastName,
              exploitantCedar,
              exploitantDate,
              exploitantSex,
              exploitantDomaine,
              exploitantAge,
              exploitantCommune,
              exploitantDistrict,
              exploitantFokotany,
              exploitantRegion,
              exploitantActivite1,
              exploitantActivite2,
              exploitantSpeciality1,
              exploitantSpeciality2,
              exploitantFormation,
              exploitantSchooling,
              ...cedarData.val()
            });
            this.listData = new MatTableDataSource<any>(array)
            console.log(this.listData)
            // this.formationNumber = this.dataSourceformations.data.length
          }
        })
      })
    })
  }

  openModal(arg: any) {
    this.modalService.openModal(ExploitantDetailComponent, '65%', '75%', { argObjet: arg })
    console.log('grah prod', arg)    
  }

}
