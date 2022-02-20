import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const DARK_MODE_CACHE_LS = 'dark_mode_theme_enabled';

@Injectable({
  providedIn: 'root',
})
export class ThemeColorManager {
  private darkMode = new BehaviorSubject<boolean>(false);

  constructor() {
    this.darkMode.next(!!localStorage.getItem(DARK_MODE_CACHE_LS));
  }

  setDarkMode(mode: boolean): void {
    this.darkMode.next(mode);

    if (mode) localStorage.setItem(DARK_MODE_CACHE_LS, 'true');
    else localStorage.removeItem(DARK_MODE_CACHE_LS);
  }

  getDarkMode(): Observable<boolean> {
    return this.darkMode.asObservable();
  }
}
