import { EntityInterface } from '@fit-friends/core';
import { TrainingDiaryInterface, TrainingDiaryItem } from '@fit-friends/shared-types';

export class TrainingDiaryEntity implements EntityInterface<TrainingDiaryEntity>, TrainingDiaryInterface {
  public id: number;
  public userId: number;
  public diary: TrainingDiaryItem[];

  constructor(trainingDiary: TrainingDiaryInterface) {
    this.fillEntity(trainingDiary);
  }

  public toObject(): TrainingDiaryEntity {
    return { ...this };
  }

  public fillEntity(trainingDiary: TrainingDiaryInterface) {
    this.id = trainingDiary.id;
    this.userId = trainingDiary.userId;
    this.diary = trainingDiary.diary;
  }
}
