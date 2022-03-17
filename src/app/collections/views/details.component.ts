import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setCurrentCollection } from 'src/app/store/actions/collection.action';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { selectCurrentCollection } from 'src/app/store/selectors/collection.selector';
import { SideNavMenuItem } from '../components/details/side-nav.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  collection$!: Observable<Collection | undefined>;
  loading!: boolean;

  menuItems: SideNavMenuItem[] = [
    {
      label: 'Items',
      icon: 'apps',
      link: 'items',
    },
    {
      label: 'Editor',
      icon: 'photo_filter',
      link: 'editor',
    },
  ];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.collection$ = this.store.select(selectCurrentCollection);
    const id = Number(this.route.snapshot.params['id']);
    this.store.dispatch(setCurrentCollection({ id }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(setCurrentCollection({ id: undefined }));
  }
}
