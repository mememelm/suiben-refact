import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class InnovationService {

    public urlCedar = '/Cedar'

    constructor(public angularFireDatabase: AngularFireDatabase) { }

    getInnovAcquiById(id: string) {
        return this.angularFireDatabase.list(this.urlCedar).snapshotChanges().pipe(
            map((data: any[]) => data.map(res => {
                if (res.payload.val().exploitantId === id) {
                    const payloadAcqui = res.payload.val().innoAcqui
                    return <any>{ ...payloadAcqui }
                }
            })),
        );
    }

    getInnovAppliById(id: string) {
        return this.angularFireDatabase.list(this.urlCedar).snapshotChanges().pipe(
            map((data: any[]) => data.map(res => {
                if (res.payload.val().exploitantId === id) {
                    const payloadAppli = res.payload.val().innoAppli
                    return <any>{ ...payloadAppli }
                }
            }))
        )
    }

    getInnovPersoById(id: string) {
        return this.angularFireDatabase.list(this.urlCedar).snapshotChanges().pipe(
            map((data: any[]) => data.map(res => {
                if (res.payload.val().exploitantId === id) {
                    const payloadPerso = res.payload.val().innoPerso
                    return <any>{ ...payloadPerso }
                }
            }))
        )
    }
}