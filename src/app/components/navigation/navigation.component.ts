import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

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

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.isOpened = false;
    this.initMenu();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  initMenu() {
    this.menuItems = [
      { label: "Home", icon:'pi pi-fw pi-home', routerLink: ['/'], routerLinkActiveOptions: { exact: true }},
      { label: "Kéréseim", icon:'pi pi-fw pi-heart', routerLink: ['requests']},
      { label: "Profil", icon:'pi pi-fw pi-user', routerLink: ['profile']},
      { label: "Beosztás", icon:'pi pi-fw pi-calendar', routerLink: ['schedule']},
      { label: "Adminisztráció", icon:'pi pi-fw pi-lock', routerLink: ['admin'], visible: this.isAdmin()}
    ];
  }

  logout() {
    this.authService.logOut();
    this.alertService.info('Sikeres kilépés!');
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
      header: 'Bejelentkezés',
      width: '300px',
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe(() =>{
      this.isOpened = false;
      if (this.loggedIn()) {
        this.initMenu();
        this.alertService.success("Sikeres belépés!");
        this.router.navigate(['/schedule']);
      }
    });
  }
}
