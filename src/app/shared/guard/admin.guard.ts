import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  canActivate(): boolean {
    const role = this.authService.decodedToken.role;
    if (role === 'Administrator') {
      return true;
    }

    this.alertService.error(this.translate.instant('guards.admin-message'));
    this.router.navigate(['/']);
    return false;
  }
}
