import { fillObject } from '@fit-friends/core';
import { APIRouteTraining, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserNotCoachException } from '../auth/exceptions/user-not-coach.exception';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { TrainingRdo } from '../rdo/training.rdo';
import { TrainingService } from './training.service';
import { TrainingQuery } from './query/training.query';
import { UpdateTrainingDto } from '../dto/update-training.dto';

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
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.Coach) {
      throw new UserNotCoachException();
    }

    const newTraining = await this.trainingService.create(dto, tokenPayload.sub);
    return fillObject(TrainingRdo, newTraining);
  }

  @Get(APIRouteTraining.GetAll)
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
  async getTrainings(
    @Query() query: TrainingQuery,
  ) {
    const trainings = await this.trainingService.getTrainings(query);

    return trainings.map((training) => fillObject(TrainingRdo, training));
  }

  @Get(APIRouteTraining.GetSpecialForMe)
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
  async getSpecialForMeTrainings(
    @Query() query: TrainingQuery,
  ) {
    const trainings = await this.trainingService.getSpecialForMeTrainings(query);

    return trainings.map((training) => fillObject(TrainingRdo, training));
  }

  @Patch(APIRouteTraining.Update)
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
    @Param('id', ParseIntPipe) trainingId: number,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.Coach) {
      throw new UserNotCoachException();
    }

    const updatedTraining = await this.trainingService.updateTraining(trainingId, dto, tokenPayload.sub);

    return fillObject(TrainingRdo, updatedTraining);
  }

  @Get(APIRouteTraining.GetById)
  @ApiOkResponse({
    type: TrainingRdo,
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
  async getTraining(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const training = await this.trainingService.getTraining(id);

    return fillObject(TrainingRdo, training);
  }
}
