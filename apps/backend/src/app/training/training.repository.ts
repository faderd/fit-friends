import { CRUDRepositoryInterface } from '@fit-friends/core';
import { TrainingDuration, TrainingInterface, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { Training } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TrainingEntity } from './training.entity';
import { TrainingQuery } from './query/training.query';

@Injectable()
export class TrainingRepository implements CRUDRepositoryInterface<TrainingEntity, number, TrainingInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TrainingEntity): Promise<TrainingInterface> {
    const entityData = item.toObject();

    return this.prisma.training.create({
      data: entityData as unknown as Training,
    }) as unknown as TrainingInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.training.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<TrainingInterface> {
    return this.prisma.training.findFirst({
      where: {
        id,
      },
      include: {
        coach: true,
      },
    }) as unknown as TrainingInterface;
  }

  public async findByCoachId(id: number): Promise<TrainingInterface[]> {
    return this.prisma.training.findMany({
      where: {
        userId: id,
      },
      include: {
        coach: true,
      },
    }) as unknown as TrainingInterface[];
  }

  public async findAll({ limit, sortDirection, isOnlyFreeTrainings, page, minPrice, maxPrice, minCalories, maxCalories, minRate, maxRate, trainingDuration, trainingType, trainingLevel, sortType }: TrainingQuery): Promise<TrainingInterface[]> {

    if (isOnlyFreeTrainings) {
      return this.prisma.training.findMany({
        where: {
          price: 0,
        },
        include: {
          coach: true,
        },
        take: limit,
      }) as unknown as TrainingInterface[];
    }

    const whereCondition: {
      price?: { gte?: number; lte?: number },
      calories?: { gte?: number; lte?: number },
      rate?: { gte?: number; lte?: number },
      trainingDuration?: { in: TrainingDuration[] },
      type?: { in: TrainingType[] },
      level?: TrainingLevel,
    } = {};

    const orderByCondition: {
      price?: 'asc' | 'desc',
      rate?: 'asc' | 'desc',
    } = {};

    if (minPrice !== undefined) {
      whereCondition.price = { gte: minPrice };
    }
    if (maxPrice !== undefined) {
      if (whereCondition.price === undefined) {
        whereCondition.price = {};
      }
      whereCondition.price.lte = maxPrice;
    }

    if (minCalories !== undefined) {
      whereCondition.calories = { gte: minCalories };
    }
    if (maxCalories !== undefined) {
      if (whereCondition.calories === undefined) {
        whereCondition.calories = {};
      }
      whereCondition.calories.lte = maxCalories;
    }

    if (minRate !== undefined) {
      whereCondition.rate = { gte: minRate };
    }
    if (maxRate !== undefined) {
      if (whereCondition.rate === undefined) {
        whereCondition.rate = {};
      }
      whereCondition.rate.lte = maxRate;
    }

    if (trainingDuration !== undefined) {
      whereCondition.trainingDuration = { in: trainingDuration }
    }

    if (trainingType !== undefined) {
      whereCondition.type = { in: trainingType }
    }

    if (trainingLevel !== undefined) {
      whereCondition.level = trainingLevel;
    }

    if (!sortType) {
      orderByCondition.price = sortDirection;
    } else {
      orderByCondition.rate = sortDirection;
    }

    return this.prisma.training.findMany({
      where: whereCondition,
      include: {
        coach: true,
      },
      take: limit,
      orderBy: orderByCondition,
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as TrainingInterface[];
  }


  public async update(id: number, item: TrainingEntity): Promise<TrainingInterface> {
    const entityData = item.toObject();

    return this.prisma.training.update({
      where: {
        id,
      },
      data: entityData as unknown as Training,
    }) as unknown as TrainingInterface;
  }
}
