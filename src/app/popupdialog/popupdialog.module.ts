import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewHolidayComponent } from '../admin/new-holiday/new-holiday.component';
import { NewRequestComponent } from '../components/requests/new-request/new-request.component';
import { LoginComponent } from '../components/login/login.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    LoginComponent,
    NewRequestComponent,
    NewHolidayComponent
  ],
  imports: [
    DropdownModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DynamicDialogModule,
    ToastModule,
    ButtonModule
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class PopupdialogModule { }
