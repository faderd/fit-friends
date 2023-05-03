import { fillObject } from '@fit-friends/core';
import { APIRouteUserBalance, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { UserBalanceService } from './user-balance.service';
import { UserBalanceRdo } from '../rdo/user-balance.rdo copy';
import { CreateUserBalanceDto } from '../dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from '../dto/update-user-balance.dto';

@ApiTags(APIRouteUserBalance.Prefix)
@Controller(APIRouteUserBalance.Prefix)
export class UserBalanceController {
  constructor(
    private readonly userBalanceService: UserBalanceService,
  ) { }

  @Post(APIRouteUserBalance.Create)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: UserBalanceRdo,
    description: 'Баланс пользователя создан',
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
    @Body() dto: CreateUserBalanceDto,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const newUserBalance = await this.userBalanceService.create(dto, tokenPayload.sub);
    return fillObject(UserBalanceRdo, newUserBalance);
  }

  @Patch(APIRouteUserBalance.Update)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: UserBalanceRdo,
    description: 'Данные обновлены'
  })
  async update(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Body() dto: UpdateUserBalanceDto,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const updatedUserBalance = await this.userBalanceService.update(dto, tokenPayload.sub);

    return fillObject(UserBalanceRdo, updatedUserBalance);
  }

  @Get(APIRouteUserBalance.Get)
  @ApiOkResponse({
    type: UserBalanceRdo,
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

    const userBalance = await this.userBalanceService.getByUserId(tokenPayload.sub);

    return userBalance.map((balance) => fillObject(UserBalanceRdo, balance));
  }

  @Get(APIRouteUserBalance.GetById)
  @ApiOkResponse({
    type: UserBalanceRdo,
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
    const userBalance = await this.userBalanceService.getById(id);

    return fillObject(UserBalanceRdo, userBalance);
  }
}
