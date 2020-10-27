import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FormationService {

    public urlCedar = '/Cedar'

    constructor(public angularFireDatabase: AngularFireDatabase) { }

    getFormationById(id: string) {
        return this.angularFireDatabase.list(this.urlCedar).snapshotChanges().pipe(
            map((data: any[]) => data.map(res => {
                if (res.payload.val().exploitantId === id) {
                    const payload = res.payload.val().formations
                    return <any>{ ...payload }
                }
            }))
        )
    }
}