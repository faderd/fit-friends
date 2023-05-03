import { OrderType } from './order-type.enum';

export interface UserBalanceInterface {
  id?: number;
  userId: number;
  entityType: OrderType;
  entityCount: number;
}
