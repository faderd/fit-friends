import { fillObject } from '@fit-friends/core';
import { APIRouteOrder, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';
import { OrderQuery } from './query/order.query';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { OrderRdo } from '../rdo/order.rdo';
import { UserNotCoachException } from '../auth/exceptions/user-not-coach.exception';
import { CoachOrdersInfoRdo } from '../rdo/coachOrdersInfo.rdo';

@ApiTags(APIRouteOrder.Prefix)
@Controller(APIRouteOrder.Prefix)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @Post(APIRouteOrder.Create)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: OrderRdo,
    description: 'Новый заказ создан',
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
    @Body() dto: CreateOrderDto,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const newOrder = await this.orderService.create(dto, tokenPayload.sub);
    return fillObject(OrderRdo, newOrder);
  }

  @Get(APIRouteOrder.GetAll)
  @ApiOkResponse({
    type: [OrderRdo],
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
  async getUserOrders(
    @Query() query: OrderQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    const orders = await this.orderService.getByUserId(query, tokenPayload.sub);

    return orders.map((review) => fillObject(OrderRdo, review));
  }

  @Get(APIRouteOrder.GetCoachOrders)
  @ApiOkResponse({
    type: [OrderRdo],
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
  async getCoachOrders(
    @Query() query: OrderQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.Coach) {
      throw new UserNotCoachException();
    }

    const orders = await this.orderService.getCoachOrders(query, tokenPayload.sub);

    return orders.map((review) => fillObject(OrderRdo, review));
  }

  @Get(APIRouteOrder.GetCoachOrdersInfo)
  @ApiOkResponse({
    type: [CoachOrdersInfoRdo],
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
  async getCoachOrderInfo(
    @Query() query: OrderQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.Coach) {
      throw new UserNotCoachException();
    }

    const coachOrdersInfo = await this.orderService.getCoachOrdersInfo(query, tokenPayload.sub);


    return coachOrdersInfo.map((coachOrderInfo) => fillObject(CoachOrdersInfoRdo, coachOrderInfo));
  }

  @Get(APIRouteOrder.StartTraining)
  @ApiOkResponse({
    description: 'Тренировка начата'
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
  async startTraining(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    return this.orderService.startTraining(id, tokenPayload.sub);
  }

  @Get(APIRouteOrder.FinishTraining)
  @ApiOkResponse({
    description: 'Тренировка начата'
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
  async stopTraining(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    return this.orderService.finishTraining(id, tokenPayload.sub);
  }
}
