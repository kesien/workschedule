export interface User {
  id: string;
  userName: string;
  name: string;
  password?: string;
  isRequest?: boolean;
  role?: number;
  receiveEmails: boolean;
}
