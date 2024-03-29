import { fillObject } from '@fit-friends/core';
import { APIRouteGym, RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GymService } from './gym.service';
import { GymQuery } from './query/gym.query';
import { GymRdo } from '../rdo/gym.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';

@ApiTags(APIRouteGym.Prefix)
@Controller(APIRouteGym.Prefix)
export class GymController {
  constructor(
    private readonly gymService: GymService,
  ) { }
  @Get(APIRouteGym.GetAll)
  @ApiOkResponse({
    type: [GymRdo],
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
    @Query() query: GymQuery,
  ) {
    const gyms = await this.gymService.getAll(query);

    return gyms.map((review) => fillObject(GymRdo, review));
  }

  @Get(APIRouteGym.GetFavoriteGyms)
  @ApiOkResponse({
    type: [GymRdo],
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
  async getFavoriteGyms(
    @Query() query: GymQuery,
    @Req() request: RequestWithTokenPayload<TokenPayload>,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const gyms = await this.gymService.getFavoriteGyms(tokenPayload.sub, query);

    return gyms.map((review) => fillObject(GymRdo, review));
  }

  @Patch(APIRouteGym.AddFavoriteGym)
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
    type: UserRdo,
    description: 'Данные получены'
  })
  async addFavoriteGym(
    @Param('id', ParseIntPipe) newFavoriteGymId: number,
    @Req() request: RequestWithTokenPayload<TokenPayload>,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    return this.gymService.addFavoriteGym(tokenPayload.sub, newFavoriteGymId);
  }

  @Patch(APIRouteGym.RemoveFavoriteGym)
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
    type: UserRdo,
    description: 'Данные получены'
  })
  async removeFavoriteGym(
    @Param('id', ParseIntPipe) removingFavoriteGymId: number,
    @Req() request: RequestWithTokenPayload<TokenPayload>,
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    return this.gymService.removeFavoriteGym(tokenPayload.sub, removingFavoriteGymId);
  }

  @Get(APIRouteGym.GetById)
  @ApiOkResponse({
    type: GymRdo,
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
  async getGym(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const gym = await this.gymService.getById(id);

    return fillObject(GymRdo, gym);
  }
}
