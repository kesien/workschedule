import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';
import { LanguageService } from './shared/services/language.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jwtHelper = new JwtHelperService();
  private defaultLang = "en";
  constructor(
    private authService: AuthService, 
    private themeService: ThemeService,
    private translate: TranslateService,
    private config: PrimeNGConfig
    ) {
  }

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    this.loadTheme();

    const lang = localStorage.getItem('lang');

    if(lang) {
        await this.translate.use(lang).toPromise();
    } else {
        await this.translate.use(this.defaultLang).toPromise();
    }
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  private loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.themeService.selectedTheme = theme
      this.themeService.switchTheme();
    }
  }
}
