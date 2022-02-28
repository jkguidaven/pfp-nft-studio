import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collections.selector';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  currentCollection$!: Observable<Collection | undefined>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentCollection$ = this.store.select(selectCurrentCollection);
  }
}
