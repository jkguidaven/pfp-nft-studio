import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { A11yModule } from '@angular/cdk/a11y';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { CreateCollectionFormComponent } from './components/forms/create-collection-form.component';
import { CoverPhotoSelectorComponent } from './components/common/cover-photo-selector.component';
import { InputFieldComponent } from './components/common/input-field.component';
import { TextAreaComponent } from './components/common/text-area.component';
import { CanvasComponent } from './components/editor/canvas.component';
import { SideComponent } from './components/editor/side.component';
import { CollectionHeaderComponent } from './components/details/collection-header.component';
import { SideNavComponent } from './components/details/side-nav.component';
import { InlineInputFieldComponent } from './components/common/inline-input-field.component';
import { EditTraitFormComponent } from './components/forms/edit-trait-form.component';
import { TraitVariantItemComponent } from './components/editor/trait-variant-item.component';
import { DndDirective } from './directives/common/dnd.directive';
import { TraitItemLoaderComponent } from './components/editor/trait-item-loader.component';
import { AddTraitVariantButtonComponent } from './components/editor/add-trait-variant-button.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsViewComponent } from './collections.component';
import { CollectionListViewComponent } from './views/list.component';
import { CollectionDetailsViewComponent } from './views/details.component';
import { CollectionModelsViewComponent } from './views/details/models.component';
import { CollectionSetupViewComponent } from './views/details/setup.component';
import { CollectionEditorViewComponent } from './views/details/editor.component';
import { AppHeaderComponent } from './components/common/app-header.component';
import { DarkModeToggleComponent } from './components/common/dark-mode-toggle.component';
import { CollectionCardComponent } from './components/list/collection-card.component';
import { CollectionCardLoaderComponent } from './components/list/collection-card-loader.component';
import { ConfirmGenerateModelDialogComponent } from './components/models/confirm-generate-model-dialog.component';
import { ModelCardComponent } from './components/models/model-card.component';

@NgModule({
  declarations: [
    CollectionsViewComponent,
    CollectionListViewComponent,
    CollectionSetupViewComponent,
    CollectionEditorViewComponent,
    CollectionDetailsViewComponent,
    CollectionModelsViewComponent,
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
    CollectionHeaderComponent,
    SideNavComponent,
    InlineInputFieldComponent,
    EditTraitFormComponent,
    TraitVariantItemComponent,
    DndDirective,
    TraitItemLoaderComponent,
    AddTraitVariantButtonComponent,
    ConfirmGenerateModelDialogComponent,
    ModelCardComponent,
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
    MatProgressBarModule,
    NgxSkeletonLoaderModule,
    DragDropModule,
    FeatherModule.pick(allIcons),
    A11yModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class CollectionsModule {}
