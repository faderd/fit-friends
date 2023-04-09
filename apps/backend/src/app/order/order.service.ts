import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './query/order.query';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { OrderType } from '@fit-friends/shared-types';
import { GymService } from '../gym/gym.service';
import { TrainingService } from '../training/training.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly gymService: GymService,
    private readonly trainingService: TrainingService,
  ) { }

  async create(dto: CreateOrderDto) {
    const { type, price, count, paymentMethod, entityId } = dto;

    // Проверим, существует ли объект с таким id
    if (type === OrderType.Subscription) {
      await this.gymService.getById(entityId);
    } else {
      await this.trainingService.getTraining(entityId);
    }

    const order = { type, price, count, paymentMethod, entityId, createdAt: new Date() };

    const orderEntity = new OrderEntity(order);

    const createdOrder = await this.orderRepository.create(orderEntity);
    return createdOrder;
  }

  async getById(id: number) {
    const existOrder = await this.orderRepository.findById(id);

    if (!existOrder) {
      throw new NotFoundException(id);
    }

    return existOrder;
  }

  async getAll(query: OrderQuery) {
    return this.orderRepository.findAll(query);
  }

  async update(id: number, dto: UpdateOrderDto) {
    const existOrder = await this.getById(id);
    const orderEntity = new OrderEntity({ ...existOrder, ...dto });
    return this.orderRepository.update(existOrder.id, orderEntity);
  }
}
