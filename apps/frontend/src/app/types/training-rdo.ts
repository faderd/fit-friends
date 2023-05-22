import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { UserRdo } from './user-rdo';

export type TrainingRdo = {
  id?: number;
  name: string;
  backgroundImage: string;
  level: TrainingLevel;
  type: TrainingType;
  trainingDuration: TrainingDuration;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  rate: number;
  userId: number;
  coach: UserRdo;
  isSpecialOffer: boolean;
};
