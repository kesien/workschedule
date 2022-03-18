import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme: string;

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.selectedTheme = this.getSelectedTheme();
  }
  switchTheme() {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this.selectedTheme + '.css';
    }

    localStorage.setItem('theme', this.selectedTheme);
  }

  getSelectedTheme() {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    
    let theme = themeLink.href.split('/');
    let themeName = theme[theme.length - 1].split('.')[0]
    
    return themeName;
  }
}
