import { TrainingLevel } from './training-level.enum';
import { TrainingType } from './training-type.enum';

export interface CoachQuestionnaireInterface {
  id?: number;
  userId: number;
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  certificate: string;
  merits: string;
  isReadyToTrain: boolean;
}
