import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addCollection,
  triggerLoadCollections,
} from 'src/app/store/actions/collections.action';
import { Collection } from 'src/app/store/models/collection';
import { State } from 'src/app/store/reducers';
import { selectCollectionsList } from 'src/app/store/selectors/collections.selector';
import { CreateCollectionFormComponent } from '../components/create-collection-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  collections$!: Observable<Collection[] | undefined>;

  constructor(private store: Store<State>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.collections$ = this.store.select(selectCollectionsList);
    this.store.dispatch(triggerLoadCollections());
  }

  openCreateCollectionForm() {
    const dialogRef = this.dialog.open(CreateCollectionFormComponent, {
      panelClass: 'custom-mat-dialog-container',
      width: '80%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((collection: Collection) => {
      if (collection) {
        this.store.dispatch(addCollection({ collection }));
      }
    });
  }

  getDescriptionByCollection(collection: Collection): string {
    return `${collection.width}px x ${collection.height}px`;
  }
}
