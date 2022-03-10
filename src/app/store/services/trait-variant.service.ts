import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { TraitVariant } from '../models/trait';
import { DBService, STORES } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class TraitVariantService {
  constructor(private dbService: DBService) {}

  getAll(traitId: number): Observable<TraitVariant[]> {
    return from(
      this.dbService.getFromStoreIndex(STORES.TRAIT_VARIANT, 'traitId', traitId)
    ).pipe(map((result) => result ?? []));
  }

  add(variant: TraitVariant): Observable<TraitVariant> {
    return from(this.dbService.addToStore(STORES.TRAIT_VARIANT, variant));
  }

  remove(id: number): Observable<void> {
    return from(this.dbService.deleteFromStore(STORES.TRAIT_VARIANT, id));
  }

  update(trait: TraitVariant): Observable<TraitVariant> {
    return from(
      this.dbService.updateToStore(STORES.TRAIT_VARIANT, trait, trait.id)
    );
  }
}
