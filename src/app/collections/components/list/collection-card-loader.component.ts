import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from 'src/app/store/reducers';
import { selectThemeIsDarkMode } from 'src/app/store/selectors/preference.selector';

@Component({
  selector: 'app-collection-card-loader',
  templateUrl: './collection-card-loader.component.html',
  styleUrls: ['./collection-card-loader.component.scss'],
})
export class CollectionCardLoaderComponent implements OnInit, OnDestroy {
  backgroundColor!: string;
  themeColorListener!: Subscription;

  constructor(private store: Store<State>) {}

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
