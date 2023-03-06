import { UserRole } from './user-role.enum';

export interface TokenPayload {
  sub: number;
  email: string;
  role: UserRole;
  name: string;
}
