import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { routes } from 'src/app/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestsComponent } from './components/requests/requests.component';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { HolidaysComponent } from './admin/holidays/holidays.component';
import { NewUserComponent } from './admin/new-user/new-user.component';
import { UsersComponent } from './admin/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleDayComponent } from './components/schedule/schedule-day/schedule-day.component';
import { ScheduleRowComponent } from './components/schedule/schedule-row/schedule-row.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SummaryComponent } from './components/schedule/summary/summary.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErrorInterceptorProvider } from './shared/interceptors/error.interceptor';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PopupdialogModule } from './popupdialog/popupdialog.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

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
    ScheduleComponent,
    ScheduleDayComponent,
    ScheduleRowComponent,
    NewUserComponent,
    HolidaysComponent,
    UsersComponent,
    SummaryComponent,
    EditUserComponent,
  ],
  imports: [
    PasswordModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    PopupdialogModule,
    DialogModule,
    TabViewModule,
    MenubarModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
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
    CollapseModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    ErrorInterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
