import { CRUDRepositoryInterface } from '@fit-friends/core';
import { UserInterface, UserRole } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './user.entity';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, number, UserInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserEntity): Promise<UserInterface> {
    const entityData = item.toObject();

    return this.prisma.user.create({
      data: entityData as User
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
      data: item as User,
    }) as unknown as UserInterface;
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      }
    }) as unknown as UserInterface;
  }

  public async findAll({ limit, sortDirection, page, isLookForCompany }: UserQuery): Promise<UserInterface[]> {
    const whereCondition: {
      role?: UserRole,
    } = {}

    if (isLookForCompany) {
      whereCondition.role = UserRole.User;
    }

    return this.prisma.user.findMany({
      where: whereCondition,
      include: {
        UserQuestionnaire: {
          where: {
            isReadyToTrain: isLookForCompany || undefined,
          }
        },
        CoachQuestionnaire: true,
      },
      take: limit,
      orderBy: {
        createdAt: sortDirection
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as UserInterface[];
  }

  public async findFriends({ limit, sortDirection, page }: UserQuery, userId: number): Promise<UserInterface[]> {
    return this.prisma.user.findMany({
      where: {
        friends: {
          has: userId
        }
      },
      include: {
        UserQuestionnaire: true,
        CoachQuestionnaire: true,
      },
      take: limit,
      orderBy: {
        createdAt: sortDirection
      },
      skip: page > 0 ? limit * (page - 1) : undefined,
    }) as unknown as UserInterface[];
  }
}
