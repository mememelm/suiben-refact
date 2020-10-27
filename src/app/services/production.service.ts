import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  public urlMarketCulture = '/MarketCulture'

  constructor(
    public angularFireDatabase: AngularFireDatabase
  ) { }

  // get initial CUMA
  getCuma(id: string) {
    return this.angularFireDatabase.list(this.urlMarketCulture).snapshotChanges().pipe(
      map((data: any[]) => data.map(res => {
        if (res.payload.val().exploitantId === id) {
          const payloadPerso = res.payload.val().innoPerso
          return <any>{ ...payloadPerso }
        }
      }))
    )
  }
}