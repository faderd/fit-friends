import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GymRepository } from './gym.repository';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [GymController],
  providers: [GymRepository, GymService, AuthService],
})
export class GymModule {}
