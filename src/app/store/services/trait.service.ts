import { Injectable } from '@angular/core';
import { Observable, from, delay, map } from 'rxjs';
import { Trait } from '../models/trait';
import { DBService, STORES } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class TraitService {
  constructor(private dbService: DBService) {}

  getAll(collectionId: number): Observable<Trait[]> {
    return from(
      this.dbService.getFromStoreIndex(
        STORES.TRAIT,
        'collectionId',
        collectionId
      )
    ).pipe(
      map((result) => {
        return result ?? [];
      })
    );
  }

  add(trait: Trait): Observable<Trait> {
    return from(this.dbService.addToStore(STORES.TRAIT, trait));
  }

  remove(id: number): Observable<void> {
    return from(this.dbService.deleteFromStore(STORES.TRAIT, id));
  }

  removeAll(collectionId: number): Observable<number[]> {
    return from(
      this.dbService.deleteFromStoreIndex(
        STORES.TRAIT,
        'collectionId',
        collectionId
      )
    );
  }

  update(trait: Trait): Observable<Trait> {
    return from(this.dbService.updateToStore(STORES.TRAIT, trait, trait.id));
  }
}
