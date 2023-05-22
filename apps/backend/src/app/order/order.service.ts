import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './query/order.query';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { OrderType } from '@fit-friends/shared-types';
import { GymService } from '../gym/gym.service';
import { TrainingService } from '../training/training.service';
import { getSortedOrdersInfo } from '../../helpers';
import { TrainingDiaryService } from '../training-diary/training-diary.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly gymService: GymService,
    private readonly trainingService: TrainingService,
    private readonly trainingDiaryService: TrainingDiaryService,
  ) { }

  async create(dto: CreateOrderDto, userId: number) {
    const { type, price, count, paymentMethod, entityId } = dto;

    // Проверим, существует ли объект с таким id
    if (type === OrderType.Subscription) {
      await this.gymService.getById(entityId);
    } else {
      await this.trainingService.getTraining(entityId);
    }

    const order = { type, price, count, paymentMethod, entityId, createdAt: new Date(), userId, isStarted: false, isClosed: false };

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

  async getByUserId(query: OrderQuery, userId: number) {
    return this.orderRepository.findByUserId(query, userId);
  }

  async update(id: number, dto: UpdateOrderDto) {
    const existOrder = await this.getById(id);
    const orderEntity = new OrderEntity({ ...existOrder, ...dto });
    return this.orderRepository.update(existOrder.id, orderEntity);
  }

  async getCoachOrders(query: OrderQuery, userId: number) {
    const coachTrainingsId = (await this.trainingService.getTrainingsByCoachId(userId)).map((training) => training.id);
    return this.orderRepository.getCoachOrders(query, coachTrainingsId);
  }

  async getCoachOrdersInfo(query: OrderQuery, userId: number) {
    const coachTrainingsId = (await this.trainingService.getTrainingsByCoachId(userId)).map((training) => training.id);
    const orders = await this.orderRepository.getCoachOrders(query, coachTrainingsId);

    const uniqueTrainingIds = Array.from(new Set(orders.map((order) => order.entityId)));

    const getCount = (id: number) => orders.reduce((count, order) => order.entityId === id ? count + 1 * order.count : count, 0);

    const getPrice = (id: number) => orders.reduce((price, order) => order.entityId === id ? price + order.price : price, 0)

    const coachOrdersInfo = [];
    for (const trainingId of uniqueTrainingIds) {
      const training = await this.trainingService.getTraining(trainingId);
      const orderInfo = {
        training,
        trainingsCount: getCount(trainingId),
        price: getPrice(trainingId)
      };

      coachOrdersInfo.push(orderInfo);
    }

    return getSortedOrdersInfo(query.sortType, query.sortDirection, coachOrdersInfo);
  }

  async startTraining(orderId: number, userId: number) {
    const existOrder = await this.orderRepository.findById(orderId);

    if (existOrder.userId !== userId) {
      throw new ConflictException();
    }
    if (existOrder.isStarted === true) {
      throw new ConflictException();
    }
    if (existOrder.count < 1) {
      throw new ConflictException();
    }

    const orderEntity = new OrderEntity({ ...existOrder, isStarted: true, count: existOrder.count - 1 });

    return this.orderRepository.update(orderId, orderEntity);
  }

  async finishTraining(orderId: number, userId: number) {
    const existOrder = await this.orderRepository.findById(orderId);

    if (existOrder.userId !== userId) {
      throw new ConflictException();
    }
    if (existOrder.isStarted === false) {
      throw new ConflictException();
    }

    const isClosed = existOrder.count <= 0;

    const orderEntity = new OrderEntity({ ...existOrder, isStarted: false, isClosed });

    const updatedOrder = await this.orderRepository.update(orderId, orderEntity);
    const existTraining = await this.trainingService.getTraining(updatedOrder.entityId);
    console.log('diary: ', await this.trainingDiaryService.update({
      diary: {
        trainingId: updatedOrder.entityId,
        caloriesLoss: existTraining.calories,
        trainingDuration: existTraining.trainingDuration,
        dateTraining: new Date()
      }
    }, userId));

    return updatedOrder;
  }
}
