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
    return from(this.dbService.getFromStore(STORES.TRAIT, key)).pipe(
      map((result) => (result ? result.traits : []))
      // delay(300)
    );
  }

  update(id: number, traits: Trait[]): Observable<Trait[]> {
    return from(
      this.dbService.updateToStore(STORES.TRAIT, {
        id,
        traits,
      })
    );
  }
}
