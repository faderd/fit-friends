import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { APIRouteEmailSubscriber, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { ApiBadRequestResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { NewTrainingInfoDto } from '../dto/new-training-info.dto';

@ApiTags(APIRouteEmailSubscriber.Prefix)
@Controller(APIRouteEmailSubscriber.Prefix)
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) { }

  @Get(APIRouteEmailSubscriber.AddSubscriber)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    description: 'Подписка добавлена'
  })
  public async create(
    @Param('coachId', ParseIntPipe) coachId: number,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    return this.subscriberService.addSubscriber(coachId, tokenPayload.sub);
  }

  @Get(APIRouteEmailSubscriber.RemoveSubscriber)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    description: 'Подписка добавлена'
  })
  public async remove(
    @Param('coachId', ParseIntPipe) coachId: number,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    return this.subscriberService.removeSubscriber(coachId, tokenPayload.sub);
  }

  public async addNewTraining(newPostInfo: NewTrainingInfoDto) {
    return this.subscriberService.addTraining(newPostInfo);
  }
}
