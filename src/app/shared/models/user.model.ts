export interface User {
  id: string
  userName: string
  name: string
  password?: string
  isRequest?: boolean
  requestId?: string
  role?: number
  receiveEmails: boolean
}
