import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailSenderService } from './email-sender.service';
import { APIRouteEmailSender } from '@fit-friends/shared-types';

@ApiTags(APIRouteEmailSender.Prefix)
@Controller(APIRouteEmailSender.Prefix)
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) { }

  @Get(APIRouteEmailSender.Send)
  async send() {
    return this.emailSenderService.sendNotifyAll();
  }
}
