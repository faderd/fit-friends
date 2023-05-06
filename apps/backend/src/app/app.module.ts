import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { ENV_FILE_PATH } from './app.constant';
import { AuthModule } from './auth/auth.module';
import envSchema from './env.schema';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { TrainingModule } from './training/training.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { GymModule } from './gym/gym.module';
import { OrderModule } from './order/order.module';
import { FoodDiaryModule } from './food-diary/food-diary.module';
import { TrainingDiaryModule } from './training-diary/training-diary.module';
import { UserBalanceModule } from './user-balance/user-balance.module';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { emailSenderOptions, getSmtpConfig } from '../config/email.config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig, rabbitMqOptions, emailSenderOptions],
      validationSchema: envSchema,
    }),
    AuthModule,
    UserModule,
    QuestionnaireModule,
    TrainingModule,
    ReviewModule,
    GymModule,
    OrderModule,
    FoodDiaryModule,
    TrainingDiaryModule,
    UserBalanceModule,
    MailerModule.forRootAsync(getSmtpConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
