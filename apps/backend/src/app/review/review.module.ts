import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReviewRepository } from './review.repository';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TrainingService } from '../training/training.service';
import { TrainingRepository } from '../training/training.repository';
import { EmailSubscriberController } from '../email-subscriber/email-subscriber.controller';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService, TrainingService, TrainingRepository, EmailSubscriberController, EmailSubscriberService, EmailSubscriberRepository, EmailSenderService, UserService, UserRepository],
})
export class ReviewModule {}
