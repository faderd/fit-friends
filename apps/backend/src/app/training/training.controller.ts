import { fillObject } from '@fit-friends/core';
import { APIRouteTRaining, RefreshTokenPayload, RequestWithTokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserNotCoachException } from '../auth/exceptions/user-not-coach.exception';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../auth/http.exception-filter';
import { CreateTrainingDto } from '../dto/create-training.dto';
import { TrainingRdo } from '../rdo/training.rdo';
import { TrainingService } from './training.service';

@UseFilters(HttpExceptionFilter)
@ApiTags(APIRouteTRaining.Prefix)
@Controller(APIRouteTRaining.Prefix)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) { }

  @Post(APIRouteTRaining.Create)
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
}
