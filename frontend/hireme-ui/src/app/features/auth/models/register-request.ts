import { UserRole } from './user-role';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
