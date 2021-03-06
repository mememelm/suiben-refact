import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatatableLanguage } from "../../../constant"
import { ModalService, DomaineService } from '../../../services';
import { map } from "rxjs/operators";
import { MatTableDataSource } from '@angular/material/table';
import { ExploitantDetailComponent } from '../../exploitant/exploitant-detail/exploitant-detail.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historic-cuvi',
  templateUrl: './historic-cuvi.component.html',
  styleUrls: ['./historic-cuvi.component.css']
})
export class HistoricCuviComponent implements OnInit {

  domaines: any
  public dataList: MatTableDataSource<any>
  public dtOptions: any = {}

  public loading: any
  alertLoading: string

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private modalService: ModalService,
    public domaineService: DomaineService,
    public datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: DatatableLanguage.datatableFrench
    }

    this.loading = true

    this.getMarketCultureHistoric()
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

  // historique culture maréchaire
  getMarketCultureHistoric() {
    const array = []
    const exploitant = this.angularFireDatabase.database.ref().child('exploitants')
    const marketCultureHistorique = this.angularFireDatabase.database.ref().child('HistoricFood')

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

      marketCultureHistorique.orderByChild('exploitantId').equalTo(exploitantId).on('value', snapshot => {
        snapshot.forEach(res => {
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

          this.dataList = new MatTableDataSource<any>(array)
          console.log('marketProductionHistoric', this.dataList)
          this.loading = false
        })
      })
    })
  }

  openModal(arg) {
    this.modalService.openModal(ExploitantDetailComponent, '65%', '75%', { argObjet: arg })
  }

  selectCedar(arg) {
    const array = [];
    const exploitant = this.angularFireDatabase.database.ref().child('exploitants');
    const cedar = this.angularFireDatabase.database.ref().child('HistoricFood');

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
            this.dataList = new MatTableDataSource<any>(array)
            console.log(this.dataList)
            // this.formationNumber = this.dataSourceformations.data.length
          }
        })
      })
    })
  }

  toCuvi() {
    this.router.navigateByUrl('cuvi')
  }
}
