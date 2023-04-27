import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrainingDiaryRepository } from './training-diary.repository';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryController } from './training-diary.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TrainingDiaryController],
  providers: [TrainingDiaryRepository, TrainingDiaryService],
  exports: [TrainingDiaryRepository]

})
export class TrainingDiaryModule {}
