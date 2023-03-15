import { EntityInterface } from '@fit-friends/core';
import { TrainingDuration, TrainingLevel, TrainingType, UserQuestionnaireInterface } from '@fit-friends/shared-types';

export class UserQuestionnaireEntity implements EntityInterface<UserQuestionnaireEntity>, UserQuestionnaireInterface {
  public id?: number;
  public userId: number;
  public trainingLevel: TrainingLevel;
  public trainingTypes: TrainingType[];
  public trainingDuration: TrainingDuration;
  public caloriesLoss: number;
  public burnsCaloriesPerDay: number;
  public isReadyToTrain: boolean;

  constructor(userQuestionnaire: UserQuestionnaireInterface) {
    this.fillEntity(userQuestionnaire);
  }

  public toObject(): UserQuestionnaireEntity {
    return { ...this };
  }

  public fillEntity(userQuestionnaire: UserQuestionnaireInterface): void {
    this.id = userQuestionnaire.id;
    this.userId = userQuestionnaire.userId;
    this.trainingLevel = userQuestionnaire.trainingLevel;
    this.trainingTypes = userQuestionnaire.trainingTypes;
    this.trainingDuration = userQuestionnaire.trainingDuration;
    this.caloriesLoss = userQuestionnaire.caloriesLoss;
    this.burnsCaloriesPerDay = userQuestionnaire.burnsCaloriesPerDay;
    this.isReadyToTrain = userQuestionnaire.isReadyToTrain;
  }
}
