import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { ListComponent } from './views/list.component';
import { EditorComponent } from './views/editor.component';
import { AppHeaderComponent } from './components/common/app-header.component';
import { DarkModeToggleComponent } from './components/common/dark-mode-toggle.component';
import { CollectionCardComponent } from './components/list/collection-card.component';
import { CollectionCardLoaderComponent } from './components/list/collection-card-loader.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { CreateCollectionFormComponent } from './components/forms/create-collection-form.component';
import { CoverPhotoSelectorComponent } from './components/common/cover-photo-selector.component';
import { InputFieldComponent } from './components/common/input-field.component';
import { TextAreaComponent } from './components/common/text-area.component';
import { CanvasComponent } from './components/editor/canvas.component';
import { SideComponent } from './components/editor/side.component';
import { DetailsComponent } from './views/details.component';
import { CollectionHeaderComponent } from './components/details/collection-header.component';
import { SideNavComponent } from './components/details/side-nav.component';
import { ItemsComponent } from './views/items.component';
import { InlineInputFieldComponent } from './components/common/inline-input-field.component';
import { EditTraitFormComponent } from './components/forms/edit-trait-form.component';
import { TraitVariantItemComponent } from './components/editor/trait-variant-item.component';
import { DndDirective } from './directives/common/dnd.directive';
import { TraitItemLoaderComponent } from './components/editor/trait-item-loader.component';
import { AddTraitVariantButtonComponent } from './components/editor/add-trait-variant-button.component';

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
    CanvasComponent,
    SideComponent,
    DetailsComponent,
    CollectionHeaderComponent,
    SideNavComponent,
    ItemsComponent,
    InlineInputFieldComponent,
    EditTraitFormComponent,
    TraitVariantItemComponent,
    DndDirective,
    TraitItemLoaderComponent,
    AddTraitVariantButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    MatExpansionModule,
    MatTooltipModule,
    MatSliderModule,
    MatCheckboxModule,
    NgxSkeletonLoaderModule,
    DragDropModule,
    FeatherModule.pick(allIcons),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class CollectionsModule {}
