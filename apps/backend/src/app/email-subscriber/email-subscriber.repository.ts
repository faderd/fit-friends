import { CRUDRepositoryInterface } from '@fit-friends/core';
import { Injectable } from '@nestjs/common';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SubscriberInterface } from '@fit-friends/shared-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepositoryInterface<EmailSubscriberEntity, number, SubscriberInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    const entityData = item.toObject();

    return this.prisma.emailSubscriber.create({
      data: entityData
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.emailSubscriber.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: number): Promise<SubscriberInterface> {
    return this.prisma.emailSubscriber.findFirst({
      where: {
        id,
      },
    });
  }

  public async findByUserId(id: number): Promise<SubscriberInterface> {
    return this.prisma.emailSubscriber.findFirst({
      where: {
        userId: id,
      },
    });
  }

  public async update(id: number, item: EmailSubscriberEntity): Promise<SubscriberInterface> {
    const entityData = item.toObject();

    return this.prisma.emailSubscriber.update({
      where: {
        id
      },
      data: entityData
    });
  };

  public async findAll(): Promise<SubscriberInterface[]> {
    return this.prisma.emailSubscriber.findMany();
  }
}
