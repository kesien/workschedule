export interface User {
  userId: string;
  userName: string;
  name: string;
  password?: string;
  isRequest?: boolean;
  role?: number;
}
