import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDarkMode } from './store/actions/theme.action';
import { ThemeState } from './store/reducers/theme.reducer';
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

  constructor(public store: Store<{ theme: ThemeState }>) {
    this.darkMode$ = store.select(selectThemeDarkMode);
  }

  ngOnInit(): void {
    this.store.dispatch(loadDarkMode());

    /*
     *  We will be listening for theme color changes and update the root component class to 'dark-mode'
     * Which is globally set to apply dark mode theme.
     */
    this.darkMode$.subscribe((darkMode: boolean) => {
      this.className = darkMode ? 'dark-mode' : '';
    });
  }
}
