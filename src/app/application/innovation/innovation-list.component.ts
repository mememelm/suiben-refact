import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services';
import { map } from 'rxjs/operators';
import { DomaineService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatatableLanguage } from "../../constant";
import { ExploitantDetailComponent } from '../exploitant/exploitant-detail/exploitant-detail.component';

@Component({
    selector: 'app-innovation-list',
    templateUrl: './innovation-list.component.html',
    styleUrls: ['./innovation-list.component.css']
})
export class InnovationListComponent implements OnInit {

    public domaines: any

    public dataSourceInnovation: MatTableDataSource<any>
    public innivationNumber: number

    public dtOptions: any = {}
    alertLoading: string
    loading: any

    constructor(
        public domaineService: DomaineService,
        public angularFireDatabase: AngularFireDatabase,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            language: DatatableLanguage.datatableFrench
        }
        this.loading = true
        this.loadDomaineList()
        this.getInnovationList()
        if (this.loading == true) {
            setTimeout(() => {
                this.alertLoading = 'Vérifiez l\'état de votre connexion internet'
            }, 60000)
        }
    }

    loadDomaineList() {
        this.domaineService.getDomaineList().snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
        ).subscribe(domaines => { this.domaines = domaines; });
    }

    getInnovationList() {
        const array = [];
        const exploitant = this.angularFireDatabase.database.ref().child('exploitants');
        const cedar = this.angularFireDatabase.database.ref().child('Cedar');

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
                    this.dataSourceInnovation = new MatTableDataSource<any>(array);
                    this.innivationNumber = this.dataSourceInnovation.data.length;
                    console.log('++++innovation++++', this.dataSourceInnovation)
                    this.loading = false
                });
            });
        });
    }

    selectCedar(argInnov) {
        const array = [];
        const exploitant = this.angularFireDatabase.database.ref().child('exploitants');
        const cedar = this.angularFireDatabase.database.ref().child('Cedar');

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
                    if (exploitantCedar === argInnov) {
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
                        this.dataSourceInnovation = new MatTableDataSource<any>(array);
                        this.innivationNumber = this.dataSourceInnovation.data.length;
                    }
                });
            });
        });
    }

    openModal(arg) {
        this.modalService.openModal(ExploitantDetailComponent, '65%', '75%', { argObjet: arg })
    }

}
