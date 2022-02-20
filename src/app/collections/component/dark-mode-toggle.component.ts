import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeColorManager } from 'src/app/theme-color-manager.service';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
  darkModeToggle = new FormControl(false);

  constructor(private themeColorManager: ThemeColorManager) {}

  ngOnInit(): void {
    this.themeColorManager.getDarkMode().subscribe((mode: boolean) => {
      this.darkModeToggle.setValue(mode);
    });

    this.darkModeToggle.valueChanges.subscribe(() => {
      this.themeColorManager.setDarkMode(this.darkModeToggle.value);
    });
  }
}
