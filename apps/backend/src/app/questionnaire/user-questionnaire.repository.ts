import { CRUDRepositoryInterface } from '@fit-friends/core';
import { UserQuestionnaireInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserQuestionnaireEntity } from './user-questionnaire.entity';

@Injectable()
export class UserQuestionnaireRepository implements CRUDRepositoryInterface<UserQuestionnaireEntity, number, UserQuestionnaireInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserQuestionnaireEntity): Promise<UserQuestionnaireInterface> {
    const entityData = item.toObject();

    return this.prisma.userQuestionnaire.create({
      data: entityData
    }) as unknown as UserQuestionnaireInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.userQuestionnaire.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<UserQuestionnaireInterface> {
    return this.prisma.userQuestionnaire.findFirst({
      where: {
        id,
      }
    }) as unknown as UserQuestionnaireInterface;
  }

  public async update(id: number, item: UserQuestionnaireEntity): Promise<UserQuestionnaireInterface> {
    return this.prisma.userQuestionnaire.update({
      where: {
        id,
      },
      data: item,
    }) as unknown as UserQuestionnaireInterface;
  }
}
