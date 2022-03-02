import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections.component';
import { DetailsComponent } from './views/details.component';
import { EditorComponent } from './views/editor.component';
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
      },
      {
        path: ':id/editor',
        component: EditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
