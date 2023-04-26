import { fillObject } from '@fit-friends/core';
import { APIRouteAuth, RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRdo } from '../rdo/user.rdo';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { QuestionnaireRdo } from '../rdo/questionnaire.rdo';
import { UpdateQuestionnaire } from '../dto/questionnaire/update-questionnaire.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AVATAR_ALLOW_FILE_TYPES, AVATAR_MAX_FILE_SIZE, CERTIFICATE_ALLOW_FILE_TYPES } from './auth.constant';
import { extname } from 'path';

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
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'questionnaire[certificate]', maxCount: 1 }
  ], {
    fileFilter: (_req, file, callback) => {
      if (file.fieldname === 'avatar') {
        const ext = extname(file.originalname).toLowerCase();
        if (!AVATAR_ALLOW_FILE_TYPES.test(ext)) {
          callback(new BadRequestException('Тип файла аватара должен быть .jpeg, .jpg, или .png'), false);
        } else if (file.size > AVATAR_MAX_FILE_SIZE) {
          callback(new BadRequestException('Превышен максимальный размер аватара'), false);
        } else {
          callback(null, true);
        }
      } else if (file.fieldname === 'questionnaire[certificate]') {
        const ext = extname(file.originalname).toLowerCase();
        if (!CERTIFICATE_ALLOW_FILE_TYPES.test(ext)) {
          callback(new BadRequestException('Тип файла сертификата должен быть .pdf'), false);
        } else {
          callback(null, true);
        }
      }
    },

  }
  ))
  async create(
    @Body() dto: CreateUserDto,
    @UploadedFiles() files: {
      avatar?: Express.Multer.File,
      ['questionnaire[certificate]']?: Express.Multer.File,
    },
  ) {
    const certificate = files ? files['questionnaire[certificate]'] : undefined;

    if (dto.role === UserRole.Coach && !certificate) {
      throw new BadRequestException('Наличие файла сертификата обязательно');
    }

    const newUser = await this.authService.register(dto, files?.avatar, certificate);
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

  @Post(APIRouteAuth.Refresh)
  @UseGuards(JwtRefreshGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Получены новые access/refresh токены'
  })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;

    return this.authService.refreshTokens({
      sub: tokenPayload.sub,
      email: tokenPayload.email,
      role: tokenPayload.role,
      name: tokenPayload.name,
    }, tokenPayload.refreshTokenId);
  }

  @Get(APIRouteAuth.Login)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async verifyAuth(
    @Req() request: RequestWithTokenPayload<TokenPayload>
  ) {
    const { user: tokenPayload } = request;
    const user = await this.authService.getUser(tokenPayload.sub);

    return fillObject(UserRdo, user);
  }

  @Get(APIRouteAuth.Logout)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiOkResponse({
    description: 'JWT сессия удалена'
  })
  async logout(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;
    return this.authService.logoutUser(tokenPayload.refreshTokenId);
  }

  @Get(APIRouteAuth.GetQuestionnaire)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: QuestionnaireRdo,
    description: 'Данные получены'
  })
  async getQuestionnaire(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const existUser = await this.authService.getUser(userId);
    const questionnaire = await this.authService.getQuestionnaire(existUser.id, existUser.role);

    return fillObject(QuestionnaireRdo, questionnaire);
  }

  @Post(APIRouteAuth.UpdateQuestionnaire)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: QuestionnaireRdo,
    description: 'Данные обновлены'
  })
  async updateQuestionnaire(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Body() dto: UpdateQuestionnaire,
  ) {
    const { user: TokenPayload } = request;
    const questionnaire = await this.authService.updateQuestionnaire(TokenPayload.sub, dto);
    return fillObject(QuestionnaireRdo, questionnaire);
  }

  @Post(APIRouteAuth.UpdateUser)
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: UserRdo,
    description: 'Данные обновлены'
  })
  async updateUser(
    @Req() request: RequestWithTokenPayload<TokenPayload>,
    @Body() dto: UpdateUserDto,
  ) {
    const { user: TokenPayload } = request;
    const updatedUser = await this.authService.updateUser(TokenPayload.sub, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @Get(APIRouteAuth.Get)
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiOkResponse({
    type: UserRdo,
    description: 'Пользователь найден'
  })
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const existUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }
}
