import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { months } from 'src/app/shared/constants/months.data';
import { HolidayYears } from 'src/app/shared/models/allholidayyears.model';
import { Holiday } from 'src/app/shared/models/holiday.model';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
  providers: [ConfirmationService]
})
export class HolidaysComponent implements OnInit {
  @Input() holidays: Holiday[] = [];
  @Input() isLoading = false;
  @Input() years!: HolidayYears;
  @Input() options: { label: string, value: number }[] = []
  @Output() onDeleteHoliday = new EventEmitter();
  @Output() onAddNewHoliday = new EventEmitter();

  totalRecords = 0;
  date = new Date();
  months = months;
  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
   }

  addNewHoliday() {
    this.onAddNewHoliday.emit();
  }

  deleteHoliday(holiday: Holiday) {
    this.onDeleteHoliday.emit(holiday);
  }

  confirm(event: Event, holiday: Holiday) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Biztos hogy törlöd?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.deleteHoliday(holiday);
      },
      reject: () => {
          return;
      }
  });
  }
}
