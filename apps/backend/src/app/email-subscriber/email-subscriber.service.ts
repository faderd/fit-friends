import { Injectable } from '@nestjs/common';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { UserService } from '../user/user.service';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { NewTrainingInfoDto } from '../dto/new-training-info.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly emailSenderService: EmailSenderService,
    private readonly userService: UserService,
  ) { }

  async addSubscriber(coachId: number, userId: number) {
    await this.userService.addSubscriber(coachId, userId);

    await this.emailSenderService.sendNotifyNewSubscriber(userId);
  }

  async removeSubscriber(coachId: number, userId: number) {
    this.userService.removeSubscriber(coachId, userId);
  }

  async addTraining(newTrainingInfo: NewTrainingInfoDto) {
    const { coachId, newTrainingId } = newTrainingInfo;

    const coach = await this.userService.getUser(coachId);

    const subscribersIds = coach.subscribers;

    for (const subscriberId of subscribersIds) {
      const existSubscribe = await this.emailSubscriberRepository.findByUserId(subscriberId);

      if (!existSubscribe) {
        const emailSubscriberEntity = new EmailSubscriberEntity({
          userId: subscriberId,
          newTrainings: new Array(newTrainingId)
        });

        await this.emailSubscriberRepository.create(emailSubscriberEntity);
      } else {

        existSubscribe.newTrainings.push(newTrainingId);
        const subscribeEntity = new EmailSubscriberEntity(existSubscribe);
        await this.emailSubscriberRepository.update(existSubscribe.id, subscribeEntity);
      }
    }
  }
}
