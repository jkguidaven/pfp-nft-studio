import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { ListComponent } from './views/list.component';
import { EditorComponent } from './views/editor.component';
import { AppHeaderComponent } from './components/common/app-header.component';
import { DarkModeToggleComponent } from './components/common/dark-mode-toggle.component';
import { CollectionCardComponent } from './components/collection-card.component';
import { CollectionCardLoaderComponent } from './components/collection-card-loader.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateCollectionFormComponent } from './components/create-collection-form.component';
import { CoverPhotoSelectorComponent } from './components/common/cover-photo-selector.component';
import { InputFieldComponent } from './components/common/input-field.component';
import { TextAreaComponent } from './components/common/text-area.component';

@NgModule({
  declarations: [
    CollectionsComponent,
    ListComponent,
    EditorComponent,
    AppHeaderComponent,
    DarkModeToggleComponent,
    CollectionCardComponent,
    CollectionCardLoaderComponent,
    CreateCollectionFormComponent,
    CoverPhotoSelectorComponent,
    InputFieldComponent,
    TextAreaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CollectionsRoutingModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class CollectionsModule {}
