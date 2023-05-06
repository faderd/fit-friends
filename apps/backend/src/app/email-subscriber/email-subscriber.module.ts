import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSenderModule } from '../email-sender/email-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }
    ]),
    EmailSenderModule,
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository
  ],
  controllers: [EmailSubscriberController],
  exports: [EmailSubscriberRepository],
})
export class EmailSubscriberModule { }
