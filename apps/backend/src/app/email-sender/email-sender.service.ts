import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_TO_SEND, ERROR_SENDING_EMAIL, NOTIFY_SUBJECT, TRAINING_URL } from './email-sender.constant';
import { EmailSubscriberRepository } from '../email-subscriber/email-subscriber.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class EmailSenderService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly userService: UserService,
  ) { }

  public async sendNotifyNewSubscriber(subscriberId: number) {
    const subscriber = await this.userService.getUser(subscriberId);

    await this.mailerService.sendMail({
      to: subscriber.email,
      from: EMAIL_TO_SEND,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
      .catch((er) => {
        throw new ServiceUnavailableException(`${ERROR_SENDING_EMAIL}: ${er}`);
      });
  }

  public async sendNotifyAll() {
    const subscribers = await this.emailSubscriberRepository.findAll();

    subscribers.forEach(async (subscriber) => {
      if (!subscriber.newTrainings) {
        return;
      }

      const newTrainingsUrls = subscriber.newTrainings.map((trainingId) => `${TRAINING_URL}${trainingId}`).join(' ');
      const subscriberUser = await this.userService.getUser(subscriber.id);

      await this.mailerService.sendMail({
        to: subscriberUser.email,
        from: EMAIL_TO_SEND,
        subject: NOTIFY_SUBJECT,
        text: newTrainingsUrls,
      })
        .then(async () => {
          await this.emailSubscriberRepository.destroy(subscriber.id);
        })
        .catch((er) => {
          throw new ServiceUnavailableException(`${ERROR_SENDING_EMAIL}: ${er}`);
        });
    });
  }
}
