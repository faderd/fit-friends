import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenPayload, TokenPayload, UserInterface, UserRole } from '@fit-friends/shared-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { UserNotFoundException, UserExistsException, UserNotRegisteredException, UserPasswordWrongException } from './exceptions';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import dayjs from 'dayjs';
import { jwtConfig } from '../../config/jwt.config';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQuestionnaireRepository } from '../questionnaire/user-questionnaire.repository';
import { CoachQuestionnaireRepository } from '../questionnaire/coach-questionnaire.repository';
import { CoachQuestionnaireEntity } from '../questionnaire/coach-questionnaire.entity';
import { CoachQuestionnaireDto } from '../dto/questionnaire/coach-questionnaire.dto';
import { UserQuestionnaireDto } from '../dto/questionnaire/user-questionnaire.dto';
import { UserQuestionnaireEntity } from '../questionnaire/user-questionnaire.entity';
import { UpdateQuestionnaire } from '../dto/questionnaire/update-questionnaire.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UPLOAD_PATH } from '../app.constant';
import { UserService } from '../user/user.service';
import { TrainingDiaryService } from '../training-diary/training-diary.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userQuestionnaireRepository: UserQuestionnaireRepository,
    private readonly coachQuestionnaireRepository: CoachQuestionnaireRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly userService: UserService,
    private readonly trainingDiaryService: TrainingDiaryService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) { }

  async register(dto: CreateUserDto, avatar: Express.Multer.File, certificate: Express.Multer.File) {
    const { name, email, gender, birthDate, role, location, password } = dto;
    const user = {
      email, passwordHash: '', name, gender, role, location, createdAt: dayjs().toDate(), birthDate: birthDate ? dayjs(birthDate).toDate() : '', friends: [], avatar: avatar ? `${UPLOAD_PATH}${avatar[0].filename}` : '', myFavoriteGyms: [], subscribers: []
    };

    const existUser = await this.userRepository
      .findByEmail(email);

    if (existUser) {
      throw new UserExistsException(email);
    }
    const userEntity = await new UserEntity(user)
      .setPassword(password);
    const createdUser = await this.userRepository
      .create(userEntity);

    if (role === UserRole.Coach) {
      const questionnaireEntity = new CoachQuestionnaireEntity({ ...dto.questionnaire as CoachQuestionnaireDto, userId: createdUser.id, certificate: `${UPLOAD_PATH}${certificate[0].filename}`, isReadyToTrain: !!dto.questionnaire.isReadyToTrain });
      await this.coachQuestionnaireRepository.create(questionnaireEntity);

    } else if (role === UserRole.User) {
      const questionnaireEntity = new UserQuestionnaireEntity({ ...dto.questionnaire as UserQuestionnaireDto, userId: createdUser.id, isReadyToTrain: false });
      await this.userQuestionnaireRepository.create(questionnaireEntity);

      // создадим пустой дневник тренировок
      await this.trainingDiaryService.create(createdUser.id);
    }

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UserPasswordWrongException();
    }

    return userEntity.toObject();
  }

  async getUser(id: number) {
    return this.userService.getUser(id);
  }

  async loginUser(user: UserInterface, refreshTokenId?: string) {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    await this.refreshTokenService
      .deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService
      .createRefreshSession(refreshTokenPayload);

    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      })
    };
  }

  async refreshTokens(user: TokenPayload, refreshTokenId: string) {
    const payload: TokenPayload = {
      sub: user.sub,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    await this.refreshTokenService
      .deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService
      .createRefreshSession(refreshTokenPayload);

    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      })
    };
  }

  async logoutUser(refreshTokenId?: string) {
    await this.refreshTokenService
      .deleteRefreshSession(refreshTokenId);
  }

  async getQuestionnaire(userId: number, userRole: UserRole) {
    if (userRole === UserRole.Coach) {
      return this.coachQuestionnaireRepository.findByUserId(userId);
    }

    if (userRole === UserRole.User) {
      return this.userQuestionnaireRepository.findByUserId(userId);
    }
  }

  async updateQuestionnaire(userId: number, dto: UpdateQuestionnaire) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new UserNotFoundException(userId);
    }

    if (existUser.role === UserRole.Coach) {
      const existQuestionnaire = await this.coachQuestionnaireRepository.findByUserId(userId);
      const questionnaireEntity = new CoachQuestionnaireEntity({ ...existQuestionnaire, ...dto });

      return this.coachQuestionnaireRepository.update(existQuestionnaire.id, questionnaireEntity);
    }

    if (existUser.role === UserRole.User) {
      const existQuestionnaire = await this.userQuestionnaireRepository.findByUserId(userId);
      const questionnaireEntity = new UserQuestionnaireEntity({ ...existQuestionnaire, ...dto });

      return this.userQuestionnaireRepository.update(existQuestionnaire.id, questionnaireEntity);
    }
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new UserNotFoundException(userId);
    }

    const userEntity = new UserEntity({ ...existUser, ...dto });

    return this.userRepository.update(existUser.id, userEntity);
  }
}
