import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CoachQuestionnaireRepository } from './coach-questionnaire.repository';
import { UserQuestionnaireRepository } from './user-questionnaire.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserQuestionnaireRepository, CoachQuestionnaireRepository],
  exports: [UserQuestionnaireRepository, CoachQuestionnaireRepository],
})
export class QuestionnaireModule { }
