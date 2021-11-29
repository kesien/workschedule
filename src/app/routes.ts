import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminGuard } from './_guard/admin.guard';
import { AuthGuard } from './_guard/auth.guard';

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
