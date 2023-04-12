import { fillObject } from '@fit-friends/core';
import { APIRouteReview, RefreshTokenPayload, RequestWithTokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewService } from './review.service';
import { ReviewRdo } from '../rdo/review.rdo';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewQuery } from './query/review.query';
import { UserNotUserException } from '../auth/exceptions/user-not-user.exception';

@ApiTags(APIRouteReview.Prefix)
@Controller(APIRouteReview.Prefix)
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) { }

  @Post(APIRouteReview.Create)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: ReviewRdo,
    description: 'Новый отзыв создан',
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
    @Body() dto: CreateReviewDto,
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>
  ) {
    const { user: tokenPayload } = request;

    if (tokenPayload.role !== UserRole.User) {
      throw new UserNotUserException();
    }

    const newReview = await this.reviewService.create(dto, tokenPayload.sub);
    return fillObject(ReviewRdo, newReview);
  }

  @Get(APIRouteReview.GetByTrainingId)
  @ApiOkResponse({
    type: [ReviewRdo],
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
  async getByTrainingId(
    @Query() query: ReviewQuery,
    @Param('id') id: string,
  ) {
    const reviews = await this.reviewService.getByTrainingId(+id, query);

    return reviews.map((review) => fillObject(ReviewRdo, review));
  }
}
