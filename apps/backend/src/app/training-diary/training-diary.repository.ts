import { CRUDRepositoryInterface } from '@fit-friends/core';
import { Injectable } from '@nestjs/common';
import { Training, TrainingDiary } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TrainingDiaryEntity } from './training-diary.entity';
import { TrainingDiaryInterface } from '@fit-friends/shared-types';

@Injectable()
export class TrainingDiaryRepository implements CRUDRepositoryInterface<TrainingDiaryEntity, number, TrainingDiaryInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TrainingDiaryEntity): Promise<TrainingDiaryInterface> {
    const entityData = item.toObject();

    return this.prisma.trainingDiary.create({
      data: entityData as unknown as TrainingDiary
    }) as unknown as TrainingDiaryInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.trainingDiary.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<TrainingDiaryInterface> {
    return this.prisma.trainingDiary.findFirst({
      where: {
        id,
      },
    }) as unknown as TrainingDiaryInterface;
  }

  public async findByUserId(id: number): Promise<TrainingDiaryInterface> {
    return this.prisma.trainingDiary.findFirst({
      where: {
        userId: id,
      },
    }) as unknown as TrainingDiaryInterface;
  }

  public async update(id: number, item: TrainingDiaryEntity): Promise<TrainingDiaryInterface> {
    const entityData = item.toObject();

    return this.prisma.trainingDiary.update({
      where: {
        id,
      },
      data: entityData as unknown as Training,
    }) as unknown as TrainingDiaryInterface;
  }
}
