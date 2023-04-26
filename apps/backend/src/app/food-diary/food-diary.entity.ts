import { EntityInterface } from '@fit-friends/core';
import { FoodDiaryInterface, FoodDiaryItem } from '@fit-friends/shared-types';

export class FoodDiaryEntity implements EntityInterface<FoodDiaryEntity>, FoodDiaryInterface {
  public id: number;
  public userId: number;
  public diary: FoodDiaryItem[];

  constructor(foodDiary: FoodDiaryInterface) {
    this.fillEntity(foodDiary);
  }

  public toObject(): FoodDiaryEntity {
    return { ...this };
  }

  public fillEntity(foodDiary: FoodDiaryInterface) {
    this.id = foodDiary.id;
    this.userId = foodDiary.userId;
    this.diary = foodDiary.diary;
  }
}
