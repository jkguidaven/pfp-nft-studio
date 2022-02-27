import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Collection } from '../models/collection';

@Injectable()
export class CollectionsService {
  getAll(): Observable<Collection[]> {
    // TO-DO implement get all collection
    return of([]);
  }

  add(collection: Collection): Observable<void> {
    // TO-DO implement add collection
    return of();
  }

  remove(id: number): Observable<void> {
    // TO-DO implement remove collection
    return of();
  }
}
