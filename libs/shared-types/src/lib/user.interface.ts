import { Gender } from './gender.enum';
import { UserLocation } from './user-location.enum';
import { UserRole } from './user-role.enum';

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  passwordHash: string;
  gender: Gender;
  birthDate: Date | string;
  role: UserRole;
  location: UserLocation;
  createdAt: Date;
  friends: number[];
}
