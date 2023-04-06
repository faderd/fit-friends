import { fillObject } from '@fit-friends/core';
import { APIRouteTraining, RefreshTokenPayload, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserNotCoachException } from '../auth/exceptions/user-not-coach.exception';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../auth/http.exception-filter';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { TrainingRdo } from '../rdo/training.rdo';
import { TrainingService } from './training.service';
import { TrainingQuery } from './query/training.query';
import { UpdateTrainingDto } from '../dto/update-training.dto';

@UseFilters(HttpExceptionFilter)
@ApiTags(APIRouteTraining.Prefix)
@Controller(APIRouteTraining.Prefix)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) { }

  @Post(APIRouteTraining.Create)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: TrainingRdo,
    description: 'Новая тренировка создана',
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
    @Body() dto: CreateTrainingDto,
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.Coach) {
      throw new UserNotCoachException();
    }

    const newTraining = await this.trainingService.create(dto, tokenPayload.sub);
    return fillObject(TrainingRdo, newTraining);
  }

  @Get(APIRouteTraining.Create)
  @ApiOkResponse({
    type: [TrainingRdo],
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
  async getMyTrainings(
    @Query() query: TrainingQuery,
  ) {
    const trainings = await this.trainingService.getTrainings(query);

    return trainings.map((training) => fillObject(TrainingRdo, training));
  }

  @Post(APIRouteTraining.Update)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: TrainingRdo,
    description: 'Данные обновлены'
  })
  async updateTraining(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Body() dto: UpdateTrainingDto,
  ) {
    const { user: TokenPayload } = request;
    const updatedTraining = await this.trainingService.updateTraining(TokenPayload.sub, dto);
    return fillObject(TrainingRdo, updatedTraining);
  }
}
