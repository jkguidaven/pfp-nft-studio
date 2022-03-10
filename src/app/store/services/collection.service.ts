import { Injectable } from '@angular/core';
import { Observable, from, delay } from 'rxjs';
import { Collection } from '../models/collection';
import { DBService, STORES } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private dbService: DBService) {}

  getAll(delayCount: number): Observable<Collection[]> {
    return from(this.dbService.getAllFromStore(STORES.COLLECTION)).pipe(
      delay(delayCount)
    );
  }

  add(collection: Collection): Observable<Collection> {
    return from(this.dbService.addToStore(STORES.COLLECTION, collection));
  }

  remove(id: number): Observable<void> {
    return from(this.dbService.deleteFromStore(STORES.COLLECTION, id));
  }

  get(id: number): Observable<Collection | undefined> {
    return from(this.dbService.getFromStore(STORES.COLLECTION, id));
  }

  update(collection: Collection): Observable<Collection | undefined> {
    return from(
      this.dbService.updateToStore(STORES.COLLECTION, collection, collection.id)
    );
  }
}
