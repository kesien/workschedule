import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jwtHelper = new JwtHelperService();
  constructor(
    private authService: AuthService, 
    private themeService: ThemeService,
    private translate: TranslateService,
    private config: PrimeNGConfig
    ) {
    this.translate.use('hu');
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

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
