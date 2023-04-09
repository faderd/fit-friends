import { OrderType, PaymentMethod } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class OrderRdo {
  @Expose()
  public id?: number;

  @Expose()
  public type: OrderType;

  @Expose()
  public price: number;

  @Expose()
  public count: number;

  @Expose()
  public paymentMethod: PaymentMethod;

  @Expose()
  public createdAt: Date;

  @Expose()
  public entityId: number;
}
