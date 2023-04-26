import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodDiaryController } from './food-diary.controller';
import { FoodDiaryRepository } from './food-diary.repository';
import { FoodDiaryService } from './food-diary.service';

@Module({
  imports: [PrismaModule],
  controllers: [FoodDiaryController],
  providers: [FoodDiaryRepository, FoodDiaryService],
})
export class FoodDiaryModule {}
