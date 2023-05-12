import { CRUDRepositoryInterface } from '@fit-friends/core';
import { RequestPersonalTrainingInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PersonalTrainingEntity } from './personal-training.entity';
import { PersonalTrainingQuery } from './query/personal-training.query';
import { RequestPersonalTraining } from '@prisma/client';

@Injectable()
export class PersonalTrainingRepository implements CRUDRepositoryInterface<PersonalTrainingEntity, number, RequestPersonalTrainingInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: PersonalTrainingEntity): Promise<RequestPersonalTrainingInterface> {
    const entityData = item.toObject();

    return this.prisma.requestPersonalTraining.create({
      data: entityData as unknown as RequestPersonalTraining,
    }) as unknown as RequestPersonalTrainingInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.requestPersonalTraining.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<RequestPersonalTrainingInterface> {
    return this.prisma.requestPersonalTraining.findFirst({
      where: {
        id,
      },
    }) as unknown as RequestPersonalTrainingInterface;
  }

  public async findByInitiatorId(id: number, { limit, sortDirection, page }: PersonalTrainingQuery): Promise<RequestPersonalTrainingInterface[]> {
    return this.prisma.requestPersonalTraining.findMany({
      where: {
        initiatorUserId: id,
      },
      take: limit,
      orderBy: { updatedAt: sortDirection },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as RequestPersonalTrainingInterface[];
  }

  public async findByTargetId(id: number, { limit, sortDirection, page }: PersonalTrainingQuery): Promise<RequestPersonalTrainingInterface[]> {
    return this.prisma.requestPersonalTraining.findMany({
      where: {
        targetUserId: id,
      },
      take: limit,
      orderBy: { updatedAt: sortDirection },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as RequestPersonalTrainingInterface[];
  }

  public async update(id: number, item: PersonalTrainingEntity): Promise<RequestPersonalTrainingInterface> {
    const entityData = item.toObject();

    return this.prisma.requestPersonalTraining.update({
      where: {
        id,
      },
      data: entityData,
    }) as unknown as RequestPersonalTrainingInterface;
  }
}
