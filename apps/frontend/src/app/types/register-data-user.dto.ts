import { Gender, UserLocation, UserRole } from '@fit-friends/shared-types';

export type RegisterDataUser = {
  name: string,
  email: string,
  password: string,
  gender: Gender,
  birthDate?: Date,
  role: UserRole,
  location: UserLocation,
  avatar: File,
}
