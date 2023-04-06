import { EntityInterface } from '@fit-friends/core';
import { ReviewInterface } from '@fit-friends/shared-types';

export class ReviewEntity implements EntityInterface<ReviewEntity>, ReviewInterface {
  public id?: number;
  public userId: number;
  public trainingId: number;
  public rate: number;
  public text: string;
  public createdAt: Date;

  constructor(review: ReviewInterface) {
    this.fillEntity(review);
  }

  public toObject(): ReviewEntity {
    return { ...this };
  }

  public fillEntity(review: ReviewInterface) {
    this.id = review.id;
    this.userId = review.userId;
    this.trainingId = review.trainingId;
    this.rate = review.rate;
    this.text = review.text;
    this.createdAt = review.createdAt;
  }
}
