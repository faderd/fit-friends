import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export type CreateTrainingDto = {
  name: string;
  backgroundImage?: string;
  level: TrainingLevel;
  type: TrainingType;
  trainingDuration: TrainingDuration;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  isSpecialOffer?: boolean;
}
