import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GymRepository } from './gym.repository';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';

@Module({
  imports: [PrismaModule],
  controllers: [GymController],
  providers: [GymRepository, GymService],
})
export class GymModule {}
