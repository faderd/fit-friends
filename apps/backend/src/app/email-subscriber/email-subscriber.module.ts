import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSenderModule } from '../email-sender/email-sender.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    EmailSenderModule,
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository, UserService, UserRepository
  ],
  controllers: [EmailSubscriberController],
  exports: [EmailSubscriberRepository],
})
export class EmailSubscriberModule { }
