import { CRUDRepositoryInterface } from '@fit-friends/core';
import { TrainingInterface } from '@fit-friends/shared-types';
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
      }
    }) as unknown as TrainingInterface;
  }

  public async findAll({ limit, sortDirection, isOnlyFreeTrainings }: TrainingQuery): Promise<TrainingInterface[]> {
    if (isOnlyFreeTrainings) {
      return this.prisma.training.findMany({
        where: {
          price: 0,
        },
        take: limit,
      }) as unknown as TrainingInterface[];
    }
    return this.prisma.training.findMany({
      take: limit,
      orderBy: {
        price: sortDirection,
      },
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
