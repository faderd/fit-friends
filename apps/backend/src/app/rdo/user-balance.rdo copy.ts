import { OrderType } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class UserBalanceRdo {
  @Expose()
  public id: number;

  @Expose()
  public userId: number;

  @Expose()
  public entityType: OrderType;

  @Expose()
  public entityCount: number;
}
