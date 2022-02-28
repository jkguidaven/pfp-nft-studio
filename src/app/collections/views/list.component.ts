import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addCollection,
  removeCollection,
  triggerLoadCollections,
} from 'src/app/store/actions/collections.action';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { selectCollectionsList } from 'src/app/store/selectors/collections.selector';
import { fade } from '../animations';
import { CreateCollectionFormComponent } from '../components/create-collection-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [fade],
})
export class ListComponent implements OnInit {
  collections$!: Observable<Collection[] | undefined>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.collections$ = this.store.select(selectCollectionsList);
    this.store.dispatch(triggerLoadCollections({ delay: 1000 }));
  }

  openCreateCollectionForm() {
    const dialogRef = this.dialog.open(CreateCollectionFormComponent, {
      panelClass: 'custom-mat-dialog-container',
      width: '80%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((collection: Collection) => {
      if (collection) {
        this.store.dispatch(
          addCollection({
            collection,
            successCallback: (result) => {
              // this.router.navigate(['collections', result.id]);
            },
          })
        );
      }
    });
  }

  onRemove(collection: Collection) {
    if (collection.id) {
      this.store.dispatch(removeCollection({ id: collection.id ?? -1 }));
    }
  }

  getDescriptionByCollection(collection: Collection): string {
    return `${collection.width}px x ${collection.height}px`;
  }

  trackCollection(_: number, collection: Collection): number | undefined {
    return collection ? collection.id : undefined;
  }
}
