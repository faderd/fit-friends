import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { GymRepository } from '../gym/gym.repository';
import { GymService } from '../gym/gym.service';
import { TrainingRepository } from '../training/training.repository';
import { TrainingService } from '../training/training.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService, GymRepository, GymService, TrainingRepository, TrainingService],
})
export class OrderModule {}
