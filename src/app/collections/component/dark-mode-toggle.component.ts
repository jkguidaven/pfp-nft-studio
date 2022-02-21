import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { setDarkMode } from 'src/app/store/actions/theme.action';
import { ThemeState } from 'src/app/store/reducers/theme.reducer';
import { selectThemeDarkMode } from 'src/app/store/selectors/theme.selector';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
  darkModeToggle = new FormControl(false);

  constructor(private store: Store<{ theme: ThemeState }>) {}

  ngOnInit(): void {
    this.store
      .select(selectThemeDarkMode)
      .pipe(take(1))
      .subscribe((mode: boolean) => {
        this.darkModeToggle.setValue(mode);

        this.darkModeToggle.valueChanges.subscribe(() => {
          this.store.dispatch(setDarkMode({ mode: this.darkModeToggle.value }));
        });
      });
  }
}
