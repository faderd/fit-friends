import { EntityInterface } from '@fit-friends/core';
import { OrderType, UserBalanceInterface } from '@fit-friends/shared-types';

export class UserBalanceEntity implements EntityInterface<UserBalanceEntity>, UserBalanceInterface {
  public id: number;
  public userId: number;
  public entityType: OrderType;
  public entityCount: number;

  constructor(userBalance: UserBalanceInterface) {
    this.fillEntity(userBalance);
  }

  public toObject(): UserBalanceEntity {
    return { ...this };
  }

  public fillEntity(userBalance: UserBalanceInterface) {
    this.id = userBalance.id;
    this.userId = userBalance.userId;
    this.entityType = userBalance.entityType;
    this.entityCount = userBalance.entityCount;
  }
}
