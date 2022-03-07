import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './shared/services/auth.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private themeService: ThemeService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    this.loadTheme();
  }

  private loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.themeService.selectedTheme = theme
      this.themeService.switchTheme();
    }
  }
}
