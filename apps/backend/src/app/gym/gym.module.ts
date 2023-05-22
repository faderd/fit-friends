import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GymRepository } from './gym.repository';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { OrderModule } from '../order/order.module';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';
import { UserQuestionnaireRepository } from '../questionnaire/user-questionnaire.repository';
import { CoachQuestionnaireRepository } from '../questionnaire/coach-questionnaire.repository';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { RefreshTokenRepository } from '../refresh-token/refresh-token.repository';
import { UserService } from '../user/user.service';
import { TrainingDiaryService } from '../training-diary/training-diary.service';
import { TrainingDiaryRepository } from '../training-diary/training-diary.repository';

@Module({
  imports: [PrismaModule, AuthModule, OrderModule, UserModule],
  controllers: [GymController],
  providers: [GymRepository, GymService, AuthService, UserRepository, UserQuestionnaireRepository, CoachQuestionnaireRepository, JwtService, RefreshTokenService, RefreshTokenRepository, UserService, TrainingDiaryService, TrainingDiaryRepository],
})
export class GymModule {}
