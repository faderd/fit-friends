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
import { OrderModule } from './order/gym.module';
import { FoodDiaryModule } from './food-diary/food-diary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
