import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadThemeMode } from './store/actions/theme.action';
import { State } from './store/reducers';
import { selectThemeDarkMode } from './store/selectors/theme.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pfp-studio';

  @HostBinding('class') className = '';

  private darkMode$!: Observable<boolean>;

  constructor(public store: Store<State>) {
    this.darkMode$ = store.select(selectThemeDarkMode);
  }

  ngOnInit(): void {
    this.store.dispatch(loadThemeMode());

    /*
     *  We will be listening for theme color changes and update the root component class to 'dark-mode'
     * Which is globally set to apply dark mode theme.
     */
    this.darkMode$.subscribe((darkMode: boolean) => {
      this.className = darkMode ? 'dark-mode' : '';
    });
  }
}
