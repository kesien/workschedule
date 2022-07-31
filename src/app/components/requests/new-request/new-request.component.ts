import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { REQUEST_TYPES } from 'src/app/shared/constants/requesttypes.constant'

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  requestTypes = REQUEST_TYPES
  private _isPeriod = false

  date?: Date | Date[]
  type = 0
  constructor(
    private ref: DynamicDialogRef,
    private translate: TranslateService,
  ) {}

  get isPeriod() {
    return this._isPeriod
  }

  set isPeriod(value) {
    if (!value && Array.isArray(this.date)) {
      this.date = undefined
    }
    this._isPeriod = value
  }

  ngOnInit(): void {
    this.requestTypes = this.requestTypes.map((rt) => {
      return { label: this.translate.instant(rt.label), value: rt.value }
    })
  }

  close() {
    this.ref.close()
  }

  save() {
    this.ref.close({
      isPeriod: this.isPeriod,
      date: this.date,
      type: this.type,
    })
  }
}
