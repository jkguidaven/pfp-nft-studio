import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { ListComponent } from './views/list.component';
import { EditorComponent } from './views/editor.component';

@NgModule({
  declarations: [CollectionsComponent, ListComponent, EditorComponent],
  imports: [CommonModule, CollectionsRoutingModule],
})
export class CollectionsModule {}
