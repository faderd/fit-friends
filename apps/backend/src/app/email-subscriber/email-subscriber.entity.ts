import { EntityInterface } from '@readme/core';
import { SubscriberInterface } from '@readme/shared-types';

export class EmailSubscriberEntity implements EntityInterface<EmailSubscriberEntity>, SubscriberInterface {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public userId: string;
  public newPosts: string[];

  constructor(emailSubscriber: SubscriberInterface) {
    this.fillEntity(emailSubscriber);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(emailSubscriber: SubscriberInterface) {
    this.id = emailSubscriber.id ?? '';
    this.email = emailSubscriber.email;
    this.firstname = emailSubscriber.firstname;
    this.lastname = emailSubscriber.lastname;
    this.userId = emailSubscriber.userId;
    this.newPosts = emailSubscriber.newPosts;
  }
}
