import { CRUDRepositoryInterface } from '@fit-friends/core';
import { ReviewInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity } from './review.entity';
import { ReviewQuery } from './query/review.query';

@Injectable()
export class ReviewRepository implements CRUDRepositoryInterface<ReviewEntity, number, ReviewInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: ReviewEntity): Promise<ReviewInterface> {
    const entityData = item.toObject();

    return this.prisma.feedback.create({
      data: entityData,
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.feedback.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<ReviewInterface> {
    return this.prisma.feedback.findFirst({
      where: {
        id,
      }
    });
  }

  public async findByTrainingId(trainingId: number, { limit, sortDirection, page }: ReviewQuery): Promise<ReviewInterface[]> {
    return this.prisma.feedback.findMany({
      where: { trainingId },
      include: { author: true },
      take: limit,
      orderBy: { createdAt: sortDirection },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as ReviewInterface[];
  }

  public async findAllByTrainingId(trainingId: number): Promise<ReviewInterface[]> {
    return this.prisma.feedback.findMany({
      where: { trainingId },
    });
  }

  public async update(id: number, item: ReviewEntity): Promise<ReviewInterface> {
    const entityData = item.toObject();

    return this.prisma.feedback.update({
      where: {
        id,
      },
      data: entityData,
    });
  }
}
