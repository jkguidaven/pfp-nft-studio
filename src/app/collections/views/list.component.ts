import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCollection } from 'src/app/store/actions/collections.action';
import { Collection } from 'src/app/store/models/collection';
import { State } from 'src/app/store/reducers';
import { selectCollectionsList } from 'src/app/store/selectors/collections.selector';
import { CreateCollectionFormComponent } from '../component/create-collection-form.component';

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
    this.store.dispatch(loadCollection());
  }

  openCreateCollectionForm() {
    const dialogRef = this.dialog.open(CreateCollectionFormComponent, {
      width: '80%',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((collection: Collection) => {
      // TO-DO - Handle storage
      console.log(collection);
    });
  }
}
