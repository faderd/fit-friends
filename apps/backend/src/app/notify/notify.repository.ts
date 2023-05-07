import { CRUDRepositoryInterface } from '@fit-friends/core';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotifyEntity } from './notify.entity';
import { NotifyQuery } from './query/notify.query';
import { NotifyInterface } from '@fit-friends/shared-types';

@Injectable()
export class NotifyRepository implements CRUDRepositoryInterface<NotifyEntity, number, NotifyInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: NotifyEntity): Promise<NotifyInterface> {
    const entityData = item.toObject();

    return this.prisma.notification.create({
      data: entityData,
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.notification.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<NotifyInterface> {
    return this.prisma.notification.findFirst({
      where: {
        id,
      }
    });
  }

  public async findByUserId(userId: number, { limit, sortDirection, page }: NotifyQuery): Promise<NotifyInterface[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      take: limit,
      orderBy: { notificationDate: sortDirection },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as NotifyInterface[];
  }

  public async update(id: number, item: NotifyEntity): Promise<NotifyInterface> {
    const entityData = item.toObject();

    return this.prisma.notification.update({
      where: {
        id,
      },
      data: entityData,
    });
  }
}
