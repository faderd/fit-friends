import { OrderType, PaymentMethod } from '@fit-friends/shared-types';

export type CreateOrderDto = {
  type: OrderType;
  price: number;
  count: number;
  paymentMethod: PaymentMethod;
  entityId: number;
}
