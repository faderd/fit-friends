import { fillObject } from '@fit-friends/core';
import { APIRouteUser, RefreshTokenPayload, RequestWithTokenPayload, UserRole } from '@fit-friends/shared-types';
import { Controller, Get, MethodNotAllowedException, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../auth/http.exception-filter';
import { UserRdo } from '../rdo/user.rdo';
import { UserService } from './user.service';

@UseFilters(HttpExceptionFilter)
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
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>
  ) {
    const { user: tokenPayload } = request;

    // if (tokenPayload.role !== UserRole.User) {
    //   throw new MethodNotAllowedException('Роль должна быть: Пользователь');
    // }

    const users = await this.userService.getUsers();
    return users.map((user) => fillObject(UserRdo, user));
  }
}
