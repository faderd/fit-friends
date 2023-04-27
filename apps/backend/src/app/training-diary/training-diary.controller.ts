import { fillObject } from '@fit-friends/core';
import { APIRouteTrainingDiary, RequestWithTokenPayload, TokenPayload } from '@fit-friends/shared-types';
import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryRdo } from '../rdo/training-diary.rdo';

@ApiTags(APIRouteTrainingDiary.Prefix)
@Controller(APIRouteTrainingDiary.Prefix)
export class TrainingDiaryController {
  constructor(
    private readonly trainingDiaryService: TrainingDiaryService,
  ) { }
  @Get(APIRouteTrainingDiary.Get)
  @ApiOkResponse({
    type: TrainingDiaryRdo,
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
  async get(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
  ) {
    const { user: tokenPayload } = request;

    const trainingDiary = await this.trainingDiaryService.getByUserId(tokenPayload.sub);

    return fillObject(TrainingDiaryRdo, trainingDiary);
  }

  @Get(APIRouteTrainingDiary.GetById)
  @ApiOkResponse({
    type: TrainingDiaryRdo,
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
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const trainingDiary = await this.trainingDiaryService.getById(id);

    return fillObject(TrainingDiaryRdo, trainingDiary);
  }
}
