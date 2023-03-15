import { TrainingDuration } from './training-duration.enum';
import { TrainingLevel } from './training-level.enum';
import { TrainingType } from './training-type.enum';

export interface UserQuestionnaireInterface {
  id?: number;
  userId: number;
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  trainingDuration: TrainingDuration;
  caloriesLoss: number;
  burnsCaloriesPerDay: number;
  isReadyToTrain: boolean;
}
