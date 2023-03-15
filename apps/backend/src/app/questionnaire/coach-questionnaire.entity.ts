import { EntityInterface } from '@fit-friends/core';
import { CoachQuestionnaireInterface, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export class CoachQuestionnaireEntity implements EntityInterface<CoachQuestionnaireEntity>, CoachQuestionnaireInterface {
  public id?: number;
  public userId: number;
  public trainingLevel: TrainingLevel;
  public trainingTypes: TrainingType[];
  public certificate: string;
  public merits: string;
  public isReadyToTrain: boolean;

  constructor(coachQuestionnaire: CoachQuestionnaireInterface) {
    this.fillEntity(coachQuestionnaire);
  }

  public toObject(): CoachQuestionnaireEntity {
    return { ...this };
  }

  public fillEntity(coachQuestionnaire: CoachQuestionnaireInterface): void {
    this.id = coachQuestionnaire.id;
    this.userId = coachQuestionnaire.userId;
    this.trainingLevel = coachQuestionnaire.trainingLevel;
    this.trainingTypes = coachQuestionnaire.trainingTypes;
    this.certificate = coachQuestionnaire.certificate;
    this.merits = coachQuestionnaire.merits;
    this.isReadyToTrain = coachQuestionnaire.isReadyToTrain;
  }
}
