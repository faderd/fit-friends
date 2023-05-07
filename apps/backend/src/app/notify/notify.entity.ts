import { EntityInterface } from '@fit-friends/core';
import { NotifyInterface } from '@fit-friends/shared-types';

export class NotifyEntity implements EntityInterface<NotifyEntity>, NotifyInterface {
  public id?: number;
  public notificationDate: Date;
  public userId: number;
  public text: string;

  constructor(review: NotifyInterface) {
    this.fillEntity(review);
  }

  public toObject(): NotifyEntity {
    return { ...this };
  }

  public fillEntity(notify: NotifyInterface) {
    this.id = notify.id;
    this.notificationDate = notify.notificationDate;
    this.userId = notify.userId;
    this.text = notify.text;
  }
}
