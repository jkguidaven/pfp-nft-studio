import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import * as traitsActions from '../actions/traits.action';
import { Trait } from '../models/trait';
import { TraitService } from '../services/trait.service';

@Injectable()
export class TraitEffects {
  constructor(private actions$: Actions, private traitService: TraitService) {}

  loadTraits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(traitsActions.triggerLoadTraits),

      mergeMap(({ collectionId }: { collectionId: number }) =>
        this.traitService.getAll(collectionId).pipe(
          map((traits: Trait[]) =>
            traitsActions.loadTraits({ traits: traits ?? [] })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
