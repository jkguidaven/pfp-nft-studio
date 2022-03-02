import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  currentCollection$!: Observable<Collection | undefined>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
  }
}
