import { EntityInterface } from '@fit-friends/core';
import { Gender, TrainingDuration, TrainingInterface, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export class TrainingEntity implements EntityInterface<TrainingEntity>, TrainingInterface {
  public id: number;
  public name: string;
  public backgroundImage: string;
  public level: TrainingLevel;
  public type: TrainingType;
  public trainingDuration: TrainingDuration;
  public price: number;
  public calories: number;
  public description: string;
  public gender: Gender;
  public video: string;
  public rate: number;
  public userId: number;
  public isSpecialOffer: boolean;

  constructor(training: TrainingInterface) {
    this.fillEntity(training);
  }

  public toObject(): TrainingEntity {
    return { ...this };
  }

  public fillEntity(training: TrainingInterface) {
    this.id = training.id;
    this.name = training.name;
    this.backgroundImage = training.backgroundImage;
    this.level = training.level;
    this.type = training.type;
    this.trainingDuration = training.trainingDuration;
    this.price = training.price;
    this.calories = training.calories;
    this.description = training.description;
    this.gender = training.gender;
    this.video = training.video;
    this.rate = training.rate;
    this.userId = training.userId;
    this.isSpecialOffer = training.isSpecialOffer;
  }
}
