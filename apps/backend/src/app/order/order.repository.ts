import { CRUDRepositoryInterface } from '@fit-friends/core';
import { OrderInterface, OrderType } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';

@Injectable()
export class OrderRepository implements CRUDRepositoryInterface<OrderEntity, number, OrderInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: OrderEntity): Promise<OrderInterface> {
    const entityData = item.toObject();

    return this.prisma.order.create({
      data: entityData,
    }) as unknown as OrderInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<OrderInterface> {
    return this.prisma.order.findFirst({
      where: {
        id,
      }
    }) as unknown as OrderInterface;
  }

  public async findByUserId({ limit, sortDirection }: OrderQuery, userId: number): Promise<OrderInterface[]> {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      take: limit,
      orderBy: {
        createdAt: sortDirection,
      },
    }) as unknown as OrderInterface[];
  }

  public async update(id: number, item: OrderEntity): Promise<OrderInterface> {
    const entityData = item.toObject();

    return this.prisma.order.update({
      where: {
        id,
      },
      data: entityData,
    }) as unknown as OrderInterface;
  }

  public async getCoachOrders({ limit, sortDirection, page }: OrderQuery, trainingIds: number[]): Promise<OrderInterface[]> {
    return this.prisma.order.findMany({
      where: {
        type: OrderType.Training,
        entityId: { in: trainingIds }
      },
      take: limit,
      orderBy: { createdAt: sortDirection },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as OrderInterface[];
  }
}
