import { RequestType } from '../shared/constants/requesttype.constant'

export interface RequestCreatedEvent {
  requestId: string
  userId: string
  name: string
  type: RequestType
  date: Date
  year: number
  month: number
  day: number
}
