import { EntityInterface } from '@fit-friends/core';
import { OrderInterface, OrderType, PaymentMethod } from '@fit-friends/shared-types';

export class OrderEntity implements EntityInterface<OrderEntity>, OrderInterface {
  public id?: number;
  public type: OrderType;
  public price: number;
  public count: number;
  public paymentMethod: PaymentMethod;
  public createdAt: Date;
  public entityId: number;
  public userId: number;

  constructor(order: OrderInterface) {
    this.fillEntity(order);
  }

  public toObject(): OrderEntity {
    return { ...this };
  }

  public fillEntity(order: OrderInterface) {
    this.id = order.id;
    this.type = order.type;
    this.price = order.price;
    this.count = order.count;
    this.paymentMethod = order.paymentMethod;
    this.createdAt = order.createdAt;
    this.entityId = order.entityId;
    this.userId = order.userId;
  }
}
