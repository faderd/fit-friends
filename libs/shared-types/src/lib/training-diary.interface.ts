import { TrainingDuration } from './training-duration.enum';

export type TrainingDiaryItem = {
  trainingId: number;
  caloriesLoss: number;
  trainingDuration: TrainingDuration;
  dateTraining: Date;
}

export interface TrainingDiaryInterface {
  id?: number;
  userId: number;
  diary: TrainingDiaryItem[]
}
