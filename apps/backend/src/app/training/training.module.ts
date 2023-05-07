import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrainingController } from './training.controller';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';
import { EmailSubscriberController } from '../email-subscriber/email-subscriber.controller';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TrainingController],
  providers: [TrainingRepository, TrainingService, EmailSubscriberController, EmailSubscriberService, EmailSubscriberRepository, EmailSenderService, UserService, UserRepository],
})
export class TrainingModule {}
