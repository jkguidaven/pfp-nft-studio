import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/store/models/collection';
import { State as AppState } from 'src/app/store/reducers';
import { selectThemeIsDarkMode } from 'src/app/store/selectors/preference.selector';
import { fade } from '../../animations';

@Component({
  selector: 'app-collection-header',
  templateUrl: './collection-header.component.html',
  styleUrls: [],
  animations: [fade],
})
export class CollectionHeaderComponent implements OnInit, OnDestroy {
  @Input() collection?: Collection | null;
  @Output() back: EventEmitter<void> = new EventEmitter<any>();

  backgroundColor!: string;
  themeColorListener!: Subscription;

  constructor(public router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.themeColorListener = this.store
      .select(selectThemeIsDarkMode)
      .subscribe((darkMode: boolean) => {
        this.backgroundColor = darkMode ? 'grey' : 'lightgrey';
      });
  }

  ngOnDestroy(): void {
    if (this.themeColorListener) {
      this.themeColorListener.unsubscribe();
    }
  }
}
