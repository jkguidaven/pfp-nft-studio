import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  EMPTY,
  forkJoin,
  map,
  mergeMap,
  of,
  withLatestFrom,
} from 'rxjs';
import * as traitVariantActions from '../actions/trait-variant.action';
import { Trait, TraitVariantDictionary } from '../models/trait';
import { State as AppState } from '../reducers';
import { selectTraits } from '../selectors/trait.selector';
import { TraitVariantService } from '../services/trait-variant.service';

@Injectable()
export class TraitVariantEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private traitVariantService: TraitVariantService
  ) {}

  loadTraitVariant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitVariantActions.triggerLoadTraitVariants),
      withLatestFrom(this.store.select(selectTraits)),
      mergeMap(([_, traits]: [any, Trait[] | undefined]) => {
        if (traits) {
          return forkJoin(
            traits.map(({ id }: Trait) => {
              return id ? this.traitVariantService.getAll(id) : of([]);
            })
          ).pipe(
            map((results) => {
              const dictionary: TraitVariantDictionary = {};

              for (let i = 0; i < traits.length; i++) {
                const trait = traits[i];
                dictionary[`${trait.id}`] = results[i].reverse();
              }

              return traitVariantActions.loadTraitVariants({ dictionary });
            })
          );
        }

        return of(traitVariantActions.loadTraitVariants({ dictionary: {} }));
      })
    )
  );

  addTraitVariant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitVariantActions.triggerAddTraitVariants),
      mergeMap(({ variants }) => {
        return forkJoin(
          variants.map((variant) => this.traitVariantService.add(variant))
        ).pipe(
          map((results) => {
            return traitVariantActions.addTraitVariants({ variants: results });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  removeTraitVariant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitVariantActions.triggerRemoveTraitVariant),
      mergeMap(({ variant }) => {
        return this.traitVariantService.remove(variant.id ?? 0).pipe(
          map(() => {
            return traitVariantActions.removeTraitVariant({ variant });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  updateTraitVariant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitVariantActions.updateTraitVariant),
      mergeMap(({ variant }) => {
        return this.traitVariantService.update(variant).pipe(
          map(() => {
            return { type: 'noAction ' };
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
