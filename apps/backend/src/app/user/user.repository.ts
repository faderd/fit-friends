import { CRUDRepositoryInterface } from '@fit-friends/core';
import { UserInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, number, UserInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserEntity): Promise<UserInterface> {
    const entityData = item.toObject();

    return this.prisma.user.create({
      data: entityData
    }) as unknown as UserInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<UserInterface> {
    return this.prisma.user.findFirst({
      where: {
        id,
      }
    }) as unknown as UserInterface;
  }

  public async update(id: number, item: UserEntity): Promise<UserInterface> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: item,
    }) as unknown as UserInterface;
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      }
    }) as unknown as UserInterface;
  }
}
