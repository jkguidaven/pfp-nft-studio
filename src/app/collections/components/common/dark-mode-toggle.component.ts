import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { setDarkMode } from 'src/app/store/actions/preference.action';
import { State } from 'src/app/store/reducers';
import { selectThemeIsDarkMode } from 'src/app/store/selectors/preference.selector';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
  darkModeToggle = new FormControl(false);

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select(selectThemeIsDarkMode)
      .pipe(take(1))
      .subscribe((mode: boolean) => {
        this.darkModeToggle.setValue(mode);

        this.darkModeToggle.valueChanges.subscribe(() => {
          this.store.dispatch(setDarkMode({ mode: this.darkModeToggle.value }));
        });
      });
  }
}
