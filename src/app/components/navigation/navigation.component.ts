import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { UserLogin } from 'src/app/shared/models/login.model';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [DialogService]
})
export class NavigationComponent implements OnInit {

  ref!: DynamicDialogRef;

  public menuItems: MenuItem[] = [];

  selectedLanguage: string = '';

  items = [
    {
      label: 'English',
      command: () => {
        this.changeLanguage('en');
      }
    },
    {
      label: 'German',
      command: () => {
        this.changeLanguage('de');
      }
    },
    {
      label: 'Hungarian',
      command: () => {
        this.changeLanguage('hu'); 
      }
    }
  ]

  isOpened = false;
  isCollapsed = true;
  isLightTheme = false;
  themeOptions: any;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private dialogService: DialogService,
    public themeService: ThemeService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
  }
  
  async ngOnInit() {
    this.initMenu();
    this.translate.get('misc.language-button-label').subscribe(res => this.selectedLanguage = res);
    this.isOpened = false;
    this.isLightTheme = this.themeService.selectedTheme === "dark-theme" ? false : true;
    this.themeOptions = [
      { label: this.translate.instant('navigation.theme.light'), value: 'light-theme' },
      { label: this.translate.instant('navigation.theme.dark'), value: 'dark-theme' }
    ]
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  initMenu() {
    this.translate.get('navigation.menu').subscribe(n => {
      this.menuItems = [
        { label: n.home, icon:'pi pi-fw pi-home', routerLink: ['/'], routerLinkActiveOptions: { exact: true }},
        { label: n.requests, icon:'pi pi-fw pi-heart', routerLink: ['requests']},
        { label: n.profile, icon:'pi pi-fw pi-user', routerLink: ['profile']},
        { label: n.schedule, icon:'pi pi-fw pi-calendar', routerLink: ['schedule']},
        //{ label: n.statistics, icon:'pi pi-fw pi-calendar', routerLink: ['statistics']},
        { label: n.admin, icon:'pi pi-fw pi-lock', routerLink: ['admin'], visible: this.isAdmin()}
      ];
    })
  }

  logout() {
    this.authService.logOut();
    this.alertService.info(this.translate.instant('navigation.login.logout-message'));
    this.router.navigate(['/']);
    this.initMenu();
  }

  isAdmin() {
    return this.authService.decodedToken?.role === 'Administrator'
  }

  login() {
    if (this.isOpened) {
      return;
    }
    this.isOpened = true;
    this.ref = this.dialogService.open(LoginComponent, {
      header: this.translate.instant('navigation.login.title'),
      width: '300px',
    });

    this.ref.onClose.subscribe(
      (userLogin: UserLogin) =>{
        this.isOpened = false;
        if (userLogin) {
          this.authService.login(userLogin).subscribe(
            () => {
              this.initMenu();
              this.alertService.success(this.translate.instant('navigation.login.success-message'));
            },
            error => this.alertService.error(error.error),
            () => {
              this.router.navigate(['/schedule']);
            }
          );
        }
      },
    );
  }

  changeTheme() {
    this.themeService.switchTheme();
    this.isLightTheme = !this.isLightTheme;
  }

  changeLanguage(lang: string) {
    switch(lang) {
      case 'de':
        this.selectedLanguage = this.translate.instant('misc.languages.german');
        break;
      case 'hu':
        this.selectedLanguage = this.translate.instant('misc.languages.hungarian');
        break;
      default:
        this.selectedLanguage = this.translate.instant('misc.languages.english');
        break;
    }
    this.languageService.switchLanguage(lang);
    this.initMenu();
  }

  toggleTheme() {
    this.themeService.selectedTheme = this.themeService.selectedTheme === "light-theme" ? "dark-theme" : "light-theme";
    this.themeService.switchTheme();
    this.isLightTheme = !this.isLightTheme;
  }
}
