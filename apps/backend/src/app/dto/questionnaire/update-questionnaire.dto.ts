import { TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export class UpdateQuestionnaire {
  id?: number;
  trainingLevel?: TrainingLevel;
  trainingTypes?: TrainingType[];
  trainingDuration?: TrainingDuration;
  caloriesLoss?: number;
  burnsCaloriesPerDay?: number;
  certificate?: string;
  merits?: string;
  isReadyToTrain?: boolean;
}
