import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections.component';
import { DetailsComponent } from './views/details.component';
import { EditorComponent } from './views/editor.component';
import { ItemsComponent } from './views/items.component';
import { ListComponent } from './views/list.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionsComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: ':id',
        component: DetailsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'items',
          },
          {
            path: 'items',
            component: ItemsComponent,
          },
          {
            path: 'editor',
            component: EditorComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
