import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeColorManager } from './theme-color-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pfp-studio';

  @HostBinding('class') className = '';

  private darkModeListener!: Subscription;

  constructor(private themeColorManager: ThemeColorManager) {}

  ngOnInit(): void {
    /*
     *  We will be listening for theme color changes and update the root component class to 'dark-mode'
     * Which is globally set to apply dark mode theme.
     */
    this.darkModeListener = this.themeColorManager
      .getDarkMode()
      .subscribe((darkMode: boolean) => {
        this.className = darkMode ? 'dark-mode' : '';
      });
  }

  ngOnDestroy(): void {
    if (this.darkModeListener) {
      this.darkModeListener.unsubscribe();
    }
  }
}
