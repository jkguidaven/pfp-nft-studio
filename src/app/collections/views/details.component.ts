import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { CollectionService } from 'src/app/store/services/collection.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  collection?: Collection;
  loading!: boolean;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.collectionService
      .get(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((collection: Collection | undefined) => {
        this.collection = collection;
      });
  }
}
