import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Day } from '../../shared/models/day.model'
import { Schedule } from '../../shared/models/schedule.model'
import { AlertService } from '../../shared/services/alert.service'
import { AuthService } from '../../shared/services/auth.service'
import { ScheduleService } from '../../shared/services/schedule.service'
import { DayType } from 'src/app/shared/constants/daytype.constant'
import { Row } from 'src/app/shared/models/row.model'
import { ScheduleDay } from 'src/app/shared/models/scheduleday.model'
import * as signalR from '@microsoft/signalr'
import { FileService } from 'src/app/shared/services/file.service'
import { DeviceDetectorService } from 'ngx-device-detector'
import { RequestCreatedEvent } from 'src/app/events/requestcreated.event'
import { RequestType } from 'src/app/shared/constants/requesttype.constant'
import { User } from 'src/app/shared/models/user.model'
import { RequestDeletedEvent } from 'src/app/events/requestdeleted.event'
import { ScheduleCreatedEvent } from 'src/app/events/schedulecreated.event'
import { ScheduleUpdatedEvent } from 'src/app/events/scheduleupdated.event'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date = new Date()
  fileUrl = environment.baseApiUrl + 'files/'
  schedule!: Schedule
  rows: Row[] = []
  editMode = false
  changes: Day[] = []
  yearRange: string
  filter: Date = new Date()
  mobile = false
  private connection?: signalR.HubConnection

  constructor(
    private alertService: AlertService,
    private scheduleService: ScheduleService,
    private fileService: FileService,
    private deviceService: DeviceDetectorService,
    public authService: AuthService,
  ) {
    this.yearRange = `${new Date().getFullYear() - 6}:${
      new Date().getFullYear() + 10
    }`
  }

  ngOnDestroy(): void {
    this.connection?.stop()
  }

  ngOnInit(): void {
    this.getSchedule(this.filter.getFullYear(), this.filter.getMonth() + 1)

    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .withUrl(environment.signalRUrl)
      .build()

    this.connection
      .start()
      .then(function () {
        console.log('SignalR Connected!')
      })
      .catch(function (err) {
        return console.error(err.toString())
      })

    this.connection.on(
      'ScheduleCreatedEvent',
      (event: ScheduleCreatedEvent) => {
        if (
          this.schedule.year == event.schedule.year &&
          this.schedule.month == event.schedule.month
        ) {
          this.schedule = event.schedule
          this.generateRows()
        }
      },
    )

    this.connection.on(
      'ScheduleUpdatedEvent',
      (event: ScheduleUpdatedEvent) => {
        if (
          this.schedule.year == event.schedule.year &&
          this.schedule.month == event.schedule.month
        ) {
          this.schedule = event.schedule
          this.generateRows()
        }
      },
    )

    this.connection.on('RequestCreatedEvent', (event: RequestCreatedEvent) => {
      if (
        this.schedule.year == event.year &&
        this.schedule.month == event.month
      ) {
        const day = this.schedule.days.find(
          (d) => new Date(d.date).getDate() == event.day,
        )
        if (event.type == RequestType.MORNING) {
          day?.usersScheduledForMorning.push({
            name: event.name,
            isRequest: true,
            requestId: event.requestId,
          } as User)
        }
        if (event.type == RequestType.FORENOON) {
          day?.usersScheduledForForenoon.push({
            name: event.name,
            isRequest: true,
            requestId: event.requestId,
          } as User)
        }
        if (event.type == RequestType.HOLIDAY) {
          day?.usersOnHoliday.push({
            name: event.name,
            isRequest: true,
            requestId: event.requestId,
          } as User)
        }
      }
    })

    this.connection.on('RequestDeletedEvent', (event: RequestDeletedEvent) => {
      this.schedule.days.forEach((day) => {
        day.usersOnHoliday = day.usersOnHoliday.filter(
          (h) => h.requestId != event.requestId,
        )
        day.usersScheduledForMorning = day.usersScheduledForMorning.filter(
          (m) => m.requestId != event.requestId,
        )
        day.usersScheduledForForenoon = day.usersScheduledForForenoon.filter(
          (f) => f.requestId != event.requestId,
        )
      })
    })

    this.mobile = this.deviceService.isMobile()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = event.target.innerWidth <= 650
  }

  getSchedule(
    year: number = this.filter.getFullYear(),
    month: number = this.filter.getMonth() + 1,
  ) {
    this.scheduleService.getSchedule(year, month).subscribe((response) => {
      this.schedule = response
      this.generateRows()
    })
  }

  createSchedule() {
    this.scheduleService
      .createSchedule(
        this.authService.decodedToken.nameid,
        this.filter.getFullYear(),
        this.filter.getMonth() + 1,
      )
      .subscribe((res) => {
        this.generateRows()
      })
  }

  deleteSchedule() {
    if (confirm(`Biztos, hogy törlöd ezt a beosztást?`)) {
      if (this.schedule.id) {
        this.scheduleService
          .deleteSchedule(this.schedule.id)
          .subscribe(() => this.alertService.success('Sikeres törlés!'))
      }
    }
  }

  getDay(date: Date) {
    let day = date.getDay()
    if (day == 0) day = 7 // make Sunday (0) the last day
    return day - 1
  }

  enableEditMode() {
    this.editMode = true
  }

  generateRows() {
    const rows: Row[] = []
    let days: ScheduleDay[] = []
    const parsedDateFromSchedule = new Date(this.schedule.days[0].date)
    const date = new Date(
      parsedDateFromSchedule.getFullYear(),
      parsedDateFromSchedule.getMonth(),
    )
    if (!rows.length) {
      for (let i = 0; i < this.getDay(date); i++) {
        days.push(new ScheduleDay(DayType.EMPTY))
      }
    }
    let index = 0
    while (date.getMonth() == parsedDateFromSchedule.getMonth()) {
      const type = this.schedule.days[index].isWeekend
        ? DayType.WEEKEND
        : DayType.NORMAL
      days.push(new ScheduleDay(type, this.schedule.days[index]))
      if (days.length === 7) {
        let validRow = days.some(
          (d) => d.type == DayType.NORMAL || d.day?.isHoliday,
        )
        if (validRow) {
          rows.push(new Row(days))
        }
        days = []
      }
      index++
      date.setDate(date.getDate() + 1)
    }
    if (days.length > 0 && days.length !== 7) {
      while (days.length !== 7) {
        days.push(new ScheduleDay(DayType.EMPTY))
      }
      rows.push(new Row(days))
    }
    this.rows = rows
  }

  dayChanged(day: Day) {
    if (this.changes.indexOf(day) < 0) {
      this.changes.push(day)
    }
  }

  saveChanges() {
    if (this.changes.length && this.schedule.id) {
      this.scheduleService
        .updateSchedule(
          this.authService.decodedToken.nameid,
          this.schedule.id,
          this.changes,
        )
        .subscribe(() => {
          this.alertService.success('Sikeres frissítés!')
          this.editMode = false
          this.changes = []
        })
    } else {
      this.editMode = false
    }
  }

  download(fileName: string) {
    this.fileService.download(fileName)
  }

  cancel() {
    this.editMode = false
    this.getSchedule(this.filter.getFullYear(), this.filter.getMonth() + 1)
  }
}
