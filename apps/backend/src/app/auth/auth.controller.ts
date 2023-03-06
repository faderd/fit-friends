import { fillObject } from '@fit-friends/core';
import { APIRouteAuth, RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRdo } from '../rdo/user.rdo';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { HttpExceptionFilter } from './http.exception-filter';

@UseFilters(HttpExceptionFilter)
@ApiTags(APIRouteAuth.Prefix)
@Controller(APIRouteAuth.Prefix)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post(APIRouteAuth.Register)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: UserRdo,
    description: 'Новый пользователь зарегистрирован',
  })
  @ApiConflictResponse({
    description: 'Пользователь с таким email существует',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post(APIRouteAuth.Login)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserRdo,
    description: 'Пользователь успешно авторизован.'
  })
  @ApiUnauthorizedResponse({
    description: 'Пароль или логин не правильный.',
  })
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post(APIRouteAuth.Refresh)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Получены новые access/refresh токены'
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;

    return this.authService.loginUser({
      id: tokenPayload.sub,
      email: tokenPayload.email,
      role: tokenPayload.role,
      name: tokenPayload.name,
    }, tokenPayload.refreshTokenId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(APIRouteAuth.Get)
  @ApiOkResponse({
    type: UserRdo,
    description: 'Пользователь найден'
  })
  async show(@Param('id', ParseIntPipe) id: number) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
