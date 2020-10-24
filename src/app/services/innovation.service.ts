import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class InnovationService {

    public dataSourceInnovation: MatTableDataSource<any>;
    public displayedColumnsInnovation = ['exploitant', 'localisation', 'innovation', 'innovationAdd'];
    public InnivationNumber: number = 0;

    constructor(
        public angularFireDatabase: AngularFireDatabase
    ) { }

    getInnovationList() {
        const array = [];
        const exploitant =  this.angularFireDatabase.database.ref().child('exploitants');
        const cedar =  this.angularFireDatabase.database.ref().child('Cedar');

        exploitant.on('child_added', snap => {
            const exploitantId = snap.val().exploitantId;
            const exploitantFirstName = snap.val().exploitantFirstName;
            const exploitantLastName = snap.val().exploitantLastName;
            const exploitantCedar = snap.val().exploitantCedar;
            const exploitantDate = snap.val().exploitantDate;
            const exploitantSex = snap.val().exploitantSex;
            const exploitantCommune = snap.val().exploitantCommune;
            const exploitantDistrict = snap.val().exploitantDistrict;
            const exploitantFokotany = snap.val().exploitantFokotany;
            const exploitantRegion = snap.val().exploitantRegion;

            cedar.orderByChild('exploitantId').equalTo(exploitantId).on('value', snapshot => {
                snapshot.forEach(cedarData => {
                    array.push({
                        exploitantId,
                        exploitantFirstName,
                        exploitantLastName,
                        exploitantCedar,
                        exploitantDate,
                        exploitantCommune,
                        exploitantDistrict,
                        exploitantFokotany,
                        exploitantRegion,
                        exploitantSex, ...cedarData.val()});
                    this.dataSourceInnovation = new MatTableDataSource<any>(array);
                    this.InnivationNumber = this.dataSourceInnovation.data.length;
                });
            });
        });
    }

    getInnovationById(argInnov) {
        const array = [];
        const exploitant =  this.angularFireDatabase.database.ref().child('exploitants');
        const cedar =  this.angularFireDatabase.database.ref().child('Cedar');

        exploitant.on('child_added', snap => {
            const exploitantId = snap.val().exploitantId;
            const exploitantFirstName = snap.val().exploitantFirstName;
            const exploitantLastName = snap.val().exploitantLastName;
            const exploitantCedar = snap.val().exploitantCedar;
            const exploitantDate = snap.val().exploitantDate;
            const exploitantSex = snap.val().exploitantSex;

            cedar.orderByChild('exploitantId').equalTo(exploitantId).on('value', snapshot => {
                snapshot.forEach(cedarData => {
                    if (exploitantCedar === argInnov) {
                        array.push({
                            exploitantId,
                            exploitantFirstName,
                            exploitantLastName,
                            exploitantCedar,
                            exploitantDate,
                            exploitantSex, ...cedarData.val()
                        });
                        this.dataSourceInnovation = new MatTableDataSource<any>(array);
                        this.InnivationNumber = this.dataSourceInnovation.data.length;
                    }
                });
            });
        });
    }
}
