import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { ListComponent } from './views/list.component';
import { EditorComponent } from './views/editor.component';
import { ListHeaderComponent } from './component/list-header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DarkModeToggleComponent } from './component/dark-mode-toggle.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    ListComponent,
    EditorComponent,
    ListHeaderComponent,
    DarkModeToggleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CollectionsRoutingModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
})
export class CollectionsModule {}
