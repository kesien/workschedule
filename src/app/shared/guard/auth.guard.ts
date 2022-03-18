import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertService.error('Először be kell jelentkezned!');
    this.router.navigate(['/']);
    return false;
  }
}
