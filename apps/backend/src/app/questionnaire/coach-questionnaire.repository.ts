import { CRUDRepositoryInterface } from '@fit-friends/core';
import { CoachQuestionnaireInterface } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoachQuestionnaireEntity } from './coach-questionnaire.entity';

@Injectable()
export class CoachQuestionnaireRepository implements CRUDRepositoryInterface<CoachQuestionnaireEntity, number, CoachQuestionnaireInterface> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CoachQuestionnaireEntity): Promise<CoachQuestionnaireInterface> {
    const entityData = item.toObject();

    return this.prisma.coachQuestionnaire.create({
      data: entityData
    }) as unknown as CoachQuestionnaireInterface;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.coachQuestionnaire.delete({
      where: {
        id,
      }
    });
  }

  public async findById(id: number): Promise<CoachQuestionnaireInterface> {
    return this.prisma.coachQuestionnaire.findFirst({
      where: {
        id,
      }
    }) as unknown as CoachQuestionnaireInterface;
  }

  public async update(id: number, item: CoachQuestionnaireEntity): Promise<CoachQuestionnaireInterface> {
    return this.prisma.coachQuestionnaire.update({
      where: {
        id,
      },
      data: item,
    }) as unknown as CoachQuestionnaireInterface;
  }

  public async findByUserId(id: number): Promise<CoachQuestionnaireInterface> {
    return this.prisma.coachQuestionnaire.findFirst({
      where: {
        userId: id,
      }
    }) as unknown as CoachQuestionnaireInterface;
  }
}
