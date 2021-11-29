import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(): boolean {
    const role = this.authService.decodedToken.role;
    if (role === 'Administrator') {
      return true;
    }

    this.alertService.error('Nincs jogosultságod megtekinteni ezt az oldalt!');
    this.router.navigate(['/']);
    return false;
  }
}
