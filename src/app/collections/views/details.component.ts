import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setCurrentCollection } from 'src/app/store/actions/collection.action';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { selectCollectionHeaderIsExpandedMode } from 'src/app/store/selectors/preference.selector';
import { SideNavMenuItem } from '../components/details/side-nav.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class CollectionDetailsViewComponent implements OnInit, OnDestroy {
  collection$!: Observable<Collection | undefined>;
  expandedHeader$!: Observable<boolean>;
  loading!: boolean;

  menuItems: SideNavMenuItem[] = [
    {
      label: 'Generated models',
      icon: 'grid',
      link: 'models',
    },
    {
      label: 'Template Editor',
      icon: 'edit',
      link: 'editor',
    },
    {
      label: 'Setup',
      icon: 'settings',
      link: 'setup',
    },
  ];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.expandedHeader$ = this.store.select(
      selectCollectionHeaderIsExpandedMode
    );
    this.collection$ = this.store.select(selectCurrentCollection);
    const id = Number(this.route.snapshot.params['id']);
    this.store.dispatch(setCurrentCollection({ id }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentCollection({ id: undefined }));
  }
}
