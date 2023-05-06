import { ConflictException, Injectable } from '@nestjs/common';
import { EMAIL_SUBSCRIBER_EXISTS } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly emailSenderService: EmailSenderService,
  ) { }

  async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existSubscriber) {
      throw new ConflictException(EMAIL_SUBSCRIBER_EXISTS);
    }

    this.emailSenderService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity({ ...subscriber, newPosts: [] }))
  }

  async addTraining(newPostInfo: NewPostInfoDto) {
    const subscribers = await this.emailSubscriberRepository.findAll();
    subscribers.forEach((subscriber) => {
      subscriber.newPosts.push(`${newPostInfo.newPostId}`);
      this.emailSubscriberRepository.update(subscriber.id, new EmailSubscriberEntity(subscriber));
    });
  }
}
