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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { NewRequestComponent } from './requests/new-request/new-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScheduleDayComponent } from './schedule/schedule-day/schedule-day.component';
import { ScheduleRowComponent } from './schedule/schedule-row/schedule-row.component';
import { SpinnerInterceptor } from './_interceptors/spinner.interceptor';
import { NewUserComponent } from './admin/new-user/new-user.component';
import { NewHolidayComponent } from './admin/new-holiday/new-holiday.component';
import { HolidaysComponent } from './admin/holidays/holidays.component';
import { UsersComponent } from './admin/users/users.component';
import { SummaryComponent } from './schedule/summary/summary.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';

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
    NewUserComponent,
    NewHolidayComponent,
    HolidaysComponent,
    UsersComponent,
    SummaryComponent,
    EditUserComponent,
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
        allowedDomains: ['workschedule-flying.herokuapp.com', 'localhost:7040'],
        disallowedRoutes: [
          'workschedule-flying.herokuapp.com/api/auth',
          'localhost:7040/api/auth',
        ],
      },
    }),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    ErrorInterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
