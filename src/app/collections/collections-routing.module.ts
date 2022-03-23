import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsViewComponent } from './collections.component';
import { CollectionDetailsViewComponent } from './views/details.component';
import { CollectionEditorViewComponent } from './views/details/editor.component';
import { CollectionModelsViewComponent } from './views/details/models.component';
import { CollectionSetupViewComponent } from './views/details/setup.component';
import { CollectionListViewComponent } from './views/list.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionsViewComponent,
    children: [
      {
        path: '',
        component: CollectionListViewComponent,
      },
      {
        path: ':id',
        component: CollectionDetailsViewComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'models',
          },
          {
            path: 'models',
            component: CollectionModelsViewComponent,
          },
          {
            path: 'editor',
            component: CollectionEditorViewComponent,
          },
          {
            path: 'setup',
            component: CollectionSetupViewComponent,
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
