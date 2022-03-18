import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'requests',
        component: RequestsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    ],
  },
];
