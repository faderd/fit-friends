import { UserRole } from '@fit-friends/shared-types';

export type UserData = {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
};
