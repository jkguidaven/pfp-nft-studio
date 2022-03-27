import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { setCollectionHeaderLayoutMode } from 'src/app/store/actions/preference.action';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import {
  selectCollectionHeaderIsExpandedMode,
  selectThemeIsDarkMode,
} from 'src/app/store/selectors/preference.selector';
import { fade, expand } from '../../animations';

@Component({
  selector: 'app-collection-header',
  templateUrl: './collection-header.component.html',
  styleUrls: [],
  animations: [fade, expand],
})
export class CollectionHeaderComponent implements OnInit {
  @Input() collection?: Collection | null;
  @Output() back: EventEmitter<void> = new EventEmitter<any>();

  expandMode$!: Observable<boolean>;
  darkMode$!: Observable<boolean>;

  constructor(public router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.expandMode$ = this.store.select(selectCollectionHeaderIsExpandedMode);
    this.darkMode$ = this.store.select(selectThemeIsDarkMode);
  }

  toggleHeaderExpand(): void {
    this.expandMode$.pipe(take(1)).subscribe((expand) => {
      this.store.dispatch(setCollectionHeaderLayoutMode({ expand: !expand }));
    });
  }

  backgroundImageURL(): string {
    return this.collection ? `url(${this.collection.coverPhoto})` : '';
  }
}
