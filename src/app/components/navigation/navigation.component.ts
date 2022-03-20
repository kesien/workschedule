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

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [DialogService]
})
export class NavigationComponent implements OnInit {

  ref!: DynamicDialogRef;

  public menuItems: MenuItem[] = [];

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
    private translate: TranslateService
  ) {
  }

  async ngOnInit() {
    await this.translate.get('navigation').toPromise().then();
    this.isOpened = false;
    this.initMenu();
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
    this.menuItems = [
      { label: this.translate.instant('navigation.menu.home'), icon:'pi pi-fw pi-home', routerLink: ['/'], routerLinkActiveOptions: { exact: true }},
      { label: this.translate.instant('navigation.menu.requests'), icon:'pi pi-fw pi-heart', routerLink: ['requests']},
      { label: this.translate.instant('navigation.menu.profile'), icon:'pi pi-fw pi-user', routerLink: ['profile']},
      { label: this.translate.instant('navigation.menu.schedule'), icon:'pi pi-fw pi-calendar', routerLink: ['schedule']},
      { label: this.translate.instant('navigation.menu.statistics'), icon:'pi pi-fw pi-calendar', routerLink: ['statistics']},
      { label: this.translate.instant('navigation.menu.admin'), icon:'pi pi-fw pi-lock', routerLink: ['admin'], visible: this.isAdmin()}
    ];
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

  toggleTheme() {
    this.themeService.selectedTheme = this.themeService.selectedTheme === "light-theme" ? "dark-theme" : "light-theme";
    this.themeService.switchTheme();
    this.isLightTheme = !this.isLightTheme;
  }
}
