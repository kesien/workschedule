import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { routes } from 'src/app/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScheduleDayComponent } from './schedule/schedule-day/schedule-day.component';
import { ScheduleRowComponent } from './schedule/schedule-row/schedule-row.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    RequestsComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    ScheduleComponent,
    NewRequestComponent,
    ScheduleDayComponent,
    ScheduleRowComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['workschedule-flying.herokuapp.com'],
        disallowedRoutes: ['workschedule-flying.herokuapp.com/api/auth'],
      },
    }),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [ErrorInterceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
