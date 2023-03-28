import { OrderType } from './order-type.enum';
import { PaymentMethod } from './payment-method.enum';

export interface OrderInterface {
  id?: number;
  type: OrderType;
  price: number;
  count: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}
