import { EntityInterface } from '@fit-friends/core';
import { SubscriberInterface } from '@fit-friends/shared-types';

export class EmailSubscriberEntity implements EntityInterface<EmailSubscriberEntity>, SubscriberInterface {
  public id: number;
  public userId: number;
  public newTrainings: number[];

  constructor(emailSubscriber: SubscriberInterface) {
    this.fillEntity(emailSubscriber);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(emailSubscriber: SubscriberInterface) {
    this.id = emailSubscriber.id;
    this.userId = emailSubscriber.userId;
    this.newTrainings = emailSubscriber.newTrainings;
  }
}
