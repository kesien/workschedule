import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { ToastrModule } from 'ngx-toastr'
import { routes } from 'src/app/routes'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TableModule } from 'primeng/table'
import { AppComponent } from './app.component'
import { JwtModule } from '@auth0/angular-jwt'
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { NgxSpinnerModule } from 'ngx-spinner'
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { ProfileComponent } from './components/profile/profile.component'
import { RequestsComponent } from './components/requests/requests.component'
import { EditUserComponent } from './components/admin/edit-user/edit-user.component'
import { HolidaysComponent } from './components/admin/holidays/holidays.component'
import { NewUserComponent } from './components/admin/new-user/new-user.component'
import { UsersComponent } from './components/admin/users/users.component'
import { HomeComponent } from './components/home/home.component'
import { ScheduleDayComponent } from './components/schedule/schedule-day/schedule-day.component'
import { ScheduleRowComponent } from './components/schedule/schedule-row/schedule-row.component'
import { ScheduleComponent } from './components/schedule/schedule.component'
import { SummaryComponent } from './components/schedule/summary/summary.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { MenubarModule } from 'primeng/menubar'
import { TabViewModule } from 'primeng/tabview'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { PanelModule } from 'primeng/panel'
import { SliderModule } from 'primeng/slider'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { AdminComponent } from './components/admin/admin.component'
import { NewHolidayComponent } from './components/admin/new-holiday/new-holiday.component'
import { NewRequestComponent } from './components/requests/new-request/new-request.component'
import { LoginComponent } from './components/login/login.component'
import { ToastModule } from 'primeng/toast'
import { CommonModule } from '@angular/common'
import { CheckboxModule } from 'primeng/checkbox'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { MenuModule } from 'primeng/menu'
import { StatisticsComponent } from './components/statistics/statistics.component'
import { ChartModule } from 'primeng/chart'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    LoginComponent,
    NewRequestComponent,
    NewHolidayComponent,
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
    StatisticsComponent,
  ],
  imports: [
    ChartModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    CheckboxModule,
    CommonModule,
    ToastModule,
    ConfirmPopupModule,
    SliderModule,
    PanelModule,
    ProgressSpinnerModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    TabViewModule,
    MenubarModule,
    MenuModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LoginComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/')
}
