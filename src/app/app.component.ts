import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPreference } from './store/actions/preference.action';
import { State } from './store/reducers';
import { selectThemeIsDarkMode } from './store/selectors/preference.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pfp-studio';

  @HostBinding('class') className = '';

  private darkMode$!: Observable<boolean>;

  constructor(
    public store: Store<State>,
    private overlayContainer: OverlayContainer
  ) {
    this.darkMode$ = store.select(selectThemeIsDarkMode);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPreference());

    /*
     *  We will be listening for theme color changes and update the root component class to 'dark-mode'
     * Which is globally set to apply dark mode theme.
     */
    this.darkMode$.subscribe((darkMode: boolean) => {
      if (darkMode) {
        this.className = 'dark-mode';
        this.overlayContainer.getContainerElement().classList.add('dark-mode');
      } else {
        this.className = '';
        this.overlayContainer
          .getContainerElement()
          .classList.remove('dark-mode');
      }
    });
  }
}
