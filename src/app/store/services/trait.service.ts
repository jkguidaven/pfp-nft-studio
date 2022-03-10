import { Injectable } from '@angular/core';
import { Observable, from, delay, map } from 'rxjs';
import { Trait } from '../models/trait';
import { DBService, STORES } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class TraitService {
  constructor(private dbService: DBService) {}

  getAll(key: number): Observable<Trait[]> {
    return from(
      this.dbService.getFromStoreIndex(STORES.TRAIT, 'collectionId', key)
    ).pipe(
      map((result) => {
        return result ?? [];
      })
      // delay(300)
    );
  }

  add(trait: Trait): Observable<Trait> {
    return from(this.dbService.addToStore(STORES.TRAIT, trait));
  }

  remove(id: number): Observable<void> {
    return from(this.dbService.deleteFromStore(STORES.TRAIT, id));
  }

  update(trait: Trait): Observable<Trait> {
    return from(this.dbService.updateToStore(STORES.TRAIT, trait, trait.id));
  }
}
