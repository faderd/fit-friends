import { Gender, UserLocation, UserRole } from '@fit-friends/shared-types';
import { QuestionnaireData } from './questionnaire-data';

export type UserRdo = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  gender: Gender;
  birthDate: Date | string;
  role: UserRole;
  location: UserLocation;
  friends: number[];
  myFavoriteGyms: number[];
  questionnaire?: QuestionnaireData;
  access_token?: string;
  refresh_token?: string;
};
