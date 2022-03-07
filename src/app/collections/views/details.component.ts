import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { triggerLoadTraits } from 'src/app/store/actions/traits.action';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { CollectionService } from 'src/app/store/services/collection.service';
import { SideNavMenuItem } from '../components/details/side-nav.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  collection?: Collection;
  loading!: boolean;

  menuItems: SideNavMenuItem[] = [
    {
      label: 'Editor',
      icon: 'photo_filter',
      link: 'editor',
    },
    {
      label: 'Items',
      icon: 'apps',
      link: 'items',
    },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.store.dispatch(triggerLoadTraits({ collectionId: id }));

    this.collectionService
      .get(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((collection: Collection | undefined) => {
        this.collection = collection;
      });
  }
}
