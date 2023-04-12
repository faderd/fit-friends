import { fillObject } from '@fit-friends/core';
import { APIRouteUser, RefreshTokenPayload, RequestWithTokenPayload, UserRole } from '@fit-friends/shared-types';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRdo } from '../rdo/user.rdo';
import { UserService } from './user.service';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';
import { UserQuery } from './query/user.query';

@ApiTags(APIRouteUser.Prefix)
@Controller(APIRouteUser.Prefix)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get(APIRouteUser.GetAll)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiOkResponse({
    type: [UserRdo],
    description: 'Данные получены'
  })
  async getAll(
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>,
    @Query() query: UserQuery,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const users = await this.userService.getUsers(query);
    return users.map((user) => fillObject(UserRdo, user));
  }

  @Get(APIRouteUser.GetMyFriends)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @ApiOkResponse({
    type: [UserRdo],
    description: 'Данные получены'
  })
  async getMyFriends(
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>,
    @Query() query: UserQuery,
  ) {
    const { user: tokenPayload } = request;

    const users = await this.userService.getMyFriends(query, tokenPayload.sub);
    return users.map((user) => fillObject(UserRdo, user));
  }
}
