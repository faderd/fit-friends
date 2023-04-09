import { fillObject } from '@fit-friends/core';
import { APIRouteOrder, RefreshTokenPayload, RequestWithTokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../auth/http.exception-filter';
import { OrderService } from './order.service';
import { OrderQuery } from './query/order.query';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { OrderRdo } from '../rdo/order.rdo';

@UseFilters(HttpExceptionFilter)
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
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const newOrder = await this.orderService.create(dto);
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
  async getAll(
    @Query() query: OrderQuery,
  ) {
    const orders = await this.orderService.getAll(query);

    return orders.map((review) => fillObject(OrderRdo, review));
  }
}
