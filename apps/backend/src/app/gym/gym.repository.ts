import { CRUDRepositoryInterface } from '@fit-friends/core';
import { GymInterface, GymOption, UserLocation } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GymEntity } from './gym.entity';
import { GymQuery } from './query/gym.query';
import { Gym } from '@prisma/client';

@Injectable()
export class GymRepository implements CRUDRepositoryInterface<GymEntity, number, GymInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: GymEntity): Promise<GymInterface> {
    const entityData = item.toObject();

    return this.prisma.gym.create({
      data: entityData as unknown as Gym,
    }) as unknown as GymInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.gym.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<GymInterface> {
    return this.prisma.gym.findFirst({
      where: {
        id,
      }
    }) as unknown as GymInterface;
  }

  public async findAll({ limit, sortDirection, page, minPrice, location, options }: GymQuery): Promise<GymInterface[]> {

    const whereCondition: {
      price?: { gte?: number; lte?: number },
      location?: { in: UserLocation[] },
      options?: { hasEvery: GymOption[] },
    } = {};

    if (minPrice !== undefined) {
      whereCondition.price = { gte: minPrice };
    }
    if (location !== undefined) {
      whereCondition.location = { in: location };
    }
    if (options !== undefined) {
      whereCondition.options = { hasEvery: options };
    }

    return this.prisma.gym.findMany({
      where: whereCondition,
      take: limit,
      orderBy: {
        createdAt: sortDirection,
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as GymInterface[];
  }

  public async update(id: number, item: GymEntity): Promise<GymInterface> {
    const entityData = item.toObject();

    return this.prisma.gym.update({
      where: {
        id,
      },
      data: entityData as unknown as Gym,
    }) as unknown as GymInterface;
  }
}
