import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {MatTableDataSource} from '@angular/material/table';

@Injectable({
    providedIn: 'root'
})
export class FormationService {
    public dataSourceformations: MatTableDataSource<any>;
    public displayedColumnsFormation = ['exploitant', 'formation', 'formationlength'];
    public formationNumber: number = 0;

    constructor(
        public angularFireDatabase: AngularFireDatabase
    ) { }

    getFormationExploitant(): any {
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
                    array.push({exploitantId, exploitantFirstName, exploitantLastName, exploitantCedar, exploitantDate, exploitantSex, ...cedarData.val()});
                    this.dataSourceformations = new MatTableDataSource<any>(array);
                    this.formationNumber = this.dataSourceformations.data.length;
                });
            });
        });
    }

    getExploitantById(argCedar) {
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
                    if (exploitantCedar === argCedar) {
                        array.push({
                            exploitantId,
                            exploitantFirstName,
                            exploitantLastName,
                            exploitantCedar,
                            exploitantDate,
                            exploitantSex, ...cedarData.val()
                        });
                        this.dataSourceformations = new MatTableDataSource<any>(array);
                        this.formationNumber = this.dataSourceformations.data.length;
                    }
                });
            });
        });
    }
}
