import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { CommandEvent } from '@readme/shared-types';
import { NewPostInfoDto } from './dto/new-post-info.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) { }

  @EventPattern({ cmd: CommandEvent.AddSubscriber })
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.AddPost })
  public async addNewPost(newPostInfo: NewPostInfoDto) {
    return this.subscriberService.addTraining(newPostInfo);
  }
}
