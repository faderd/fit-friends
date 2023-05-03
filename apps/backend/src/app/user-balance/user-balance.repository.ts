import { CRUDRepositoryInterface } from '@fit-friends/core';
import { UserBalanceInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserBalanceEntity } from './user-balance.entity';

@Injectable()
export class UserBalanceRepository implements CRUDRepositoryInterface<UserBalanceEntity, number, UserBalanceInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserBalanceEntity): Promise<UserBalanceInterface> {
    const entityData = item.toObject();

    return this.prisma.userBalance.create({
      data: entityData
    }) as unknown as UserBalanceInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.userBalance.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<UserBalanceInterface> {
    return this.prisma.userBalance.findFirst({
      where: {
        id,
      },
    }) as unknown as UserBalanceInterface;
  }

  public async findByUserId(id: number): Promise<UserBalanceInterface[]> {
    return this.prisma.userBalance.findMany({
      where: {
        userId: id,
      },
    }) as unknown as UserBalanceInterface[];
  }

  public async update(id: number, item: UserBalanceEntity): Promise<UserBalanceInterface> {
    const entityData = item.toObject();

    return this.prisma.userBalance.update({
      where: {
        id,
      },
      data: entityData,
    }) as unknown as UserBalanceInterface;
  }
}
