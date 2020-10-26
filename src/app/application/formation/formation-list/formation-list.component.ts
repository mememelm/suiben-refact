import { Component, OnInit } from '@angular/core';
import { DomaineService, FormationService, ModalService } from '../../../services';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatatableLanguage } from "../../../constant";
import { ExploitantDetailComponent } from '../../exploitant/exploitant-detail/exploitant-detail.component';

@Component({
    selector: 'app-formation-list',
    templateUrl: './formation-list.component.html',
    styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

    public dataSourceformations: MatTableDataSource<any>;

    domaines: any
    alertLoading: string
    loading: any
    formationNumber: number

    public dtOptions: any = {}

    constructor(
        public formationService: FormationService,
        public domaineService: DomaineService,
        private angularFireDatabase: AngularFireDatabase,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            language: DatatableLanguage.datatableFrench
        }
        this.loading = true
        this.getFormationExploitant()
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

    getFormationExploitant(): any {
        const array = []
        const exploitant = this.angularFireDatabase.database.ref().child('exploitants')
        const cedar = this.angularFireDatabase.database.ref().child('Cedar')

        exploitant.on('child_added', snap => {
            const exploitantId = snap.val().exploitantId;
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
                    })

                    this.dataSourceformations = new MatTableDataSource<any>(array)
                    console.log('+++formation+++', this.dataSourceformations)
                    this.formationNumber = this.dataSourceformations.data.length
                    console.log(this.formationNumber)
                    this.loading = false
                })
            })
        })
    }

    selectCedar(arg) {
        const array = [];
        const exploitant = this.angularFireDatabase.database.ref().child('exploitants');
        const cedar = this.angularFireDatabase.database.ref().child('Cedar');

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
                        this.dataSourceformations = new MatTableDataSource<any>(array)
                        console.log(this.dataSourceformations)
                        this.formationNumber = this.dataSourceformations.data.length
                    }
                })
            })
        })
    }

    openModal(arg) {
        this.modalService.openModal(ExploitantDetailComponent, '65%', '75%', { argObjet: arg })
    }
}
