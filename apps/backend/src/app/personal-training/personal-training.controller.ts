import { fillObject } from '@fit-friends/core';
import { APIRoutePersonalTraining, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserNotCoachException } from '../auth/exceptions/user-not-coach.exception';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PersonalTrainingService } from './personal-training.service';
import { PersonalTrainingQuery } from './query/personal-training.query';
import { PersonalTrainingRdo } from '../rdo/personal-training.rdo';
import { CreatePersonalTrainingDto } from '../dto/create-personal-training.dto';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { UpdatePersonalTrainingDto } from '../dto/update-personal-training.dto';

@ApiTags(APIRoutePersonalTraining.Prefix)
@Controller(APIRoutePersonalTraining.Prefix)
export class PersonalTrainingController {
  constructor(
    private readonly personalTrainingService: PersonalTrainingService,
  ) { }

  @Post(APIRoutePersonalTraining.Create)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: PersonalTrainingRdo,
    description: 'Запрос на персональную тренировку создан',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async create(
    @Body() dto: CreatePersonalTrainingDto,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const newRequest = await this.personalTrainingService.create(dto, tokenPayload.sub);
    return fillObject(PersonalTrainingRdo, newRequest);
  }

  @Get(APIRoutePersonalTraining.GetByTargetUserId)
  @ApiOkResponse({
    type: [PersonalTrainingRdo],
    description: 'Данные получены'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async getRequestsByTargetUserId(
    @Query() query: PersonalTrainingQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    const requests = await this.personalTrainingService.getRequestsByTargetUserId(tokenPayload.sub, query);

    return requests.map((training) => fillObject(PersonalTrainingRdo, training));
  }

  @Get(APIRoutePersonalTraining.GetByInitiatorUserId)
  @ApiOkResponse({
    type: [PersonalTrainingRdo],
    description: 'Данные получены'
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async getRequestsByInitiatorUserId(
    @Query() query: PersonalTrainingQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    const requests = await this.personalTrainingService.getRequestsByInitiatorUserId(tokenPayload.sub, query);

    return requests.map((training) => fillObject(PersonalTrainingRdo, training));
  }

  @Patch(APIRoutePersonalTraining.Update)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: PersonalTrainingRdo,
    description: 'Данные обновлены'
  })
  async updateTraining(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Body() dto: UpdatePersonalTrainingDto,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    const { user: tokenPayload } = request;

    const updatedRequest = await this.personalTrainingService.updateRequest(requestId, dto, tokenPayload.sub);

    return fillObject(PersonalTrainingRdo, updatedRequest);
  }
}
