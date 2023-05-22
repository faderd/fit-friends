import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../config/jwt.config';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterOptions } from '../../config/multer.config';
import { UserService } from '../user/user.service';
import { TrainingDiaryService } from '../training-diary/training-diary.service';
import { TrainingDiaryModule } from '../training-diary/training-diary.module';

@Module({
  imports: [
    TrainingDiaryModule,
    UserModule,
    QuestionnaireModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    MulterModule.registerAsync({
      useFactory: getMulterOptions
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    UserService,
    TrainingDiaryService,
  ],
})
export class AuthModule { }
