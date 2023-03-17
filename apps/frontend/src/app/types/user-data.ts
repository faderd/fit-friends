import { Gender, UserLocation, UserRole } from '@fit-friends/shared-types';

export type UserData = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  gender: Gender;
  birthDate: Date | string;
  role: UserRole;
  location: UserLocation;
  access_token?: string;
  refresh_token?: string;
};
