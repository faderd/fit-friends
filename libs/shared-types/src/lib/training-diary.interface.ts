import { TrainingDuration } from './training-duration.enum';

export interface TrainingDiaryInterface {
  id?: number;
  trainingId: number;
  caloriesLoss: number;
  trainingDuration: TrainingDuration;
  dateTraining: Date;
  userId: number;
}
