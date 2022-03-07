import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageEffects } from './effects/local-storage.effects';
import { HttpClientModule } from '@angular/common/http';
import { CollectionEffects } from './effects/collection.effects';
import { TraitEffects } from './effects/trait.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NgRxStoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      LocalStorageEffects,
      CollectionEffects,
      TraitEffects,
    ]),
  ],
})
export class StoreModule {}
