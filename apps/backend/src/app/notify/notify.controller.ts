import { fillObject } from '@fit-friends/core';
import { APIRouteNotify, RequestWithTokenPayload, TokenPayload } from '@fit-friends/shared-types';
import { Controller, Delete, Get, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotifyService } from './notify.service';
import { NotifyQuery } from './query/notify.query';
import { NotifyRdo } from '../rdo/notify.rdo';

@ApiTags(APIRouteNotify.Prefix)
@Controller(APIRouteNotify.Prefix)
export class NotifyController {
  constructor(
    private readonly notifyService: NotifyService,
  ) { }
  @Get(APIRouteNotify.Get)
  @ApiOkResponse({
    type: [NotifyRdo],
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
  async getByUserId(
    @Query() query: NotifyQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>,
  ) {
    const { user: tokenPayload } = request;

    const notifications = await this.notifyService.getByUserId(tokenPayload.sub, query);

    return notifications.map((review) => fillObject(NotifyRdo, review));
  }

  @Delete(APIRouteNotify.Remove)
  @ApiOkResponse({
    description: 'Данные удалены'
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
  async remove(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { user: tokenPayload } = request;
    return this.notifyService.delete(id, tokenPayload.sub);
  }
}
