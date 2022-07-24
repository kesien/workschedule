export interface HolidayCreatedEvent {
  id?: string
  year: number
  month: number
  day: number
  isFix: boolean
}

export interface HolidayDeletedEvent {
  id: string
}
