import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDarkMode = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.applyTheme();
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
    }
    localStorage.getItem('theme') === 'dark' ? this.isDarkMode = true : this.isDarkMode = false;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = this.document.body;
    
    if (this.isDarkMode) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  }

  get darkModeActive(): boolean {
    return this.isDarkMode;
  }
}