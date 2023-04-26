import { CRUDRepositoryInterface } from '@fit-friends/core';
import { FoodDiaryInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { FoodDiary, Training } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FoodDiaryEntity } from './food-diary.entity';

@Injectable()
export class FoodDiaryRepository implements CRUDRepositoryInterface<FoodDiaryEntity, number, FoodDiaryInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: FoodDiaryEntity): Promise<FoodDiaryInterface> {
    const entityData = item.toObject();

    return this.prisma.foodDiary.create({
      data: entityData as unknown as FoodDiary
    }) as unknown as FoodDiaryInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.foodDiary.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<FoodDiaryInterface> {
    return this.prisma.foodDiary.findFirst({
      where: {
        id,
      },
    }) as unknown as FoodDiaryInterface;
  }

  public async findByUserId(id: number): Promise<FoodDiaryInterface> {
    return this.prisma.foodDiary.findFirst({
      where: {
        userId: id,
      },
    }) as unknown as FoodDiaryInterface;
  }

  public async update(id: number, item: FoodDiaryEntity): Promise<FoodDiaryInterface> {
    const entityData = item.toObject();

    return this.prisma.foodDiary.update({
      where: {
        id,
      },
      data: entityData as unknown as Training,
    }) as unknown as FoodDiaryInterface;
  }
}
