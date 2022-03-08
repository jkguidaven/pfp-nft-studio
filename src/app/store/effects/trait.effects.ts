import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import * as traitActions from '../actions/trait.action';
import { Trait } from '../models/trait';
import { State as AppState } from '../reducers';
import { selectCurrentCollection } from '../selectors/collection.selector';
import { selectTraits } from '../selectors/trait.selector';
import { TraitService } from '../services/trait.service';

@Injectable()
export class TraitEffects {
  constructor(
    private actions$: Actions,
    private traitService: TraitService,
    private store: Store<AppState>
  ) {}

  loadTraits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.triggerLoadTraits),

      mergeMap(({ collectionId }: { collectionId: number }) =>
        this.traitService.getAll(collectionId).pipe(
          map((traits: Trait[]) =>
            traitActions.loadTraits({ traits: traits ?? [] })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  changeTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ...[
          traitActions.addTrait,
          traitActions.removeTrait,
          traitActions.updateTrait,
          traitActions.moveTrait,
        ]
      ),
      map(() => traitActions.persistTraits())
    )
  );

  persistTrait$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitActions.persistTraits),
      concatLatestFrom(() => [
        this.store.select(selectCurrentCollection),
        this.store.select(selectTraits),
      ]),
      mergeMap(([, collection, traits]: any[]) => {
        return this.traitService.update(collection.id, traits).pipe(
          map(() => ({
            type: 'noAction',
          })),
          catchError((err) => {
            console.log(err);
            return EMPTY;
          })
        );
      })
    )
  );
}
