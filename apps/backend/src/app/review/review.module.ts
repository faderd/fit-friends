import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReviewRepository } from './review.repository';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TrainingService } from '../training/training.service';
import { TrainingRepository } from '../training/training.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService, TrainingService, TrainingRepository],
})
export class ReviewModule {}
