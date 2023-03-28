import { Gender } from './gender.enum';
import { TrainingDuration } from './training-duration.enum';
import { TrainingLevel } from './training-level.enum';
import { TrainingType } from './training-type.enum';

export interface TrainingInterface {
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
  isSpecialOffer: boolean;
}
