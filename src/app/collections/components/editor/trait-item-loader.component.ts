import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State as AppState } from 'src/app/store/reducers';
import { selectThemeIsDarkMode } from 'src/app/store/selectors/preference.selector';
import { fade } from '../../animations';

@Component({
  selector: 'app-trait-item-loader',
  templateUrl: './trait-item-loader.component.html',
  styleUrls: ['./trait-item-loader.component.scss'],
  animations: [fade],
})
export class TraitItemLoaderComponent implements OnInit {
  backgroundColor!: string;
  themeColorListener!: Subscription;

  constructor(private store: Store<AppState>) {}

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
