import { Module } from '@nestjs/common';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { EmailSenderController } from './email-sender.controller';
import { EmailSenderService } from './email-sender.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [],
  providers: [EmailSenderService, EmailSubscriberRepository, UserService, UserRepository],
  controllers: [EmailSenderController],
  exports: [EmailSenderService],
})
export class EmailSenderModule { }
