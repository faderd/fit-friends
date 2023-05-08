import { EntityInterface } from '@fit-friends/core';
import { RequestPersonalTrainingInterface, StatusRequestTraining } from '@fit-friends/shared-types';

export class PersonalTrainingEntity implements EntityInterface<PersonalTrainingEntity>, RequestPersonalTrainingInterface {
  public id: number;
  public initiatorUserId: number;
  public targetUserId: number;
  public createdAt: Date;
  public updatedAt: Date;
  public status: StatusRequestTraining;

  constructor(training: RequestPersonalTrainingInterface) {
    this.fillEntity(training);
  }

  public toObject(): PersonalTrainingEntity {
    return { ...this };
  }

  public fillEntity(training: RequestPersonalTrainingInterface) {
    this.id = training.id;
    this.initiatorUserId = training.initiatorUserId;
    this.targetUserId = training.targetUserId;
    this.createdAt = training.createdAt;
    this.updatedAt = training.updatedAt;
    this.status = training.status;
  }
}
