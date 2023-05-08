import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PersonalTrainingController } from './personal-training.controller';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingService } from './personal-training.service';

@Module({
  imports: [PrismaModule],
  controllers: [PersonalTrainingController],
  providers: [PersonalTrainingRepository, PersonalTrainingService],
})
export class PersonalTrainingModule {}
