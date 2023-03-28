import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrainingController } from './training.controller';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrainingController],
  providers: [TrainingRepository, TrainingService],
})
export class TrainingModule {}
