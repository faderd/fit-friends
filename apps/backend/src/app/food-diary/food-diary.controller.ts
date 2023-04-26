import { fillObject } from '@fit-friends/core';
import { APIRouteFoodDiary, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FoodDiaryService } from './food-diary.service';
import { CreateFoodDiaryDto } from '../dto/create-food-diary.dto';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { FoodDiaryRdo } from '../rdo/food-diary.rdo';
import { UpdateFoodDiaryDto } from '../dto/update-food-diary.dto';

@ApiTags(APIRouteFoodDiary.Prefix)
@Controller(APIRouteFoodDiary.Prefix)
export class FoodDiaryController {
  constructor(
    private readonly foodDiaryService: FoodDiaryService,
  ) { }

  @Post(APIRouteFoodDiary.Create)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: FoodDiaryRdo,
    description: 'Дневник питания создан',
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
    @Body() dto: CreateFoodDiaryDto,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const newFoodDiary = await this.foodDiaryService.create(dto, tokenPayload.sub);
    return fillObject(FoodDiaryRdo, newFoodDiary);
  }

  @Patch(APIRouteFoodDiary.Update)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: FoodDiaryRdo,
    description: 'Данные обновлены'
  })
  async update(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Body() dto: UpdateFoodDiaryDto,
    // @Param('id', ParseIntPipe) foodDiaryId: number,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const updatedFoodDiary = await this.foodDiaryService.update(dto, tokenPayload.sub);

    return fillObject(FoodDiaryRdo, updatedFoodDiary);
  }

  @Get(APIRouteFoodDiary.Get)
  @ApiOkResponse({
    type: FoodDiaryRdo,
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

    const foodDiary = await this.foodDiaryService.getByUserId(tokenPayload.sub);

    return fillObject(FoodDiaryRdo, foodDiary);
  }

  @Get(APIRouteFoodDiary.GetById)
  @ApiOkResponse({
    type: FoodDiaryRdo,
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
    const foodDiary = await this.foodDiaryService.getById(id);

    return fillObject(FoodDiaryRdo, foodDiary);
  }
}
