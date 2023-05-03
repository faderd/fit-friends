import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { GymRepository } from '../gym/gym.repository';
import { GymService } from '../gym/gym.service';
import { TrainingRepository } from '../training/training.repository';
import { TrainingService } from '../training/training.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { UserQuestionnaireRepository } from '../questionnaire/user-questionnaire.repository';
import { CoachQuestionnaireRepository } from '../questionnaire/coach-questionnaire.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { RefreshTokenRepository } from '../refresh-token/refresh-token.repository';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService, GymRepository, GymService, TrainingRepository, TrainingService, AuthService, UserRepository, UserQuestionnaireRepository, CoachQuestionnaireRepository, JwtService, RefreshTokenService, RefreshTokenRepository],
})
export class OrderModule {}
