import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenPayload, TokenPayload, UserInterface } from '@fit-friends/shared-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  UserNotFoundException,
  UserExistsException,
  UserNotRegisteredException,
  UserPasswordWrongException
} from './exceptions';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import dayjs from 'dayjs';
import { jwtConfig } from '../../config/jwt.config';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) { }

  async register(dto: CreateUserDto) {
    const { name, email, gender, birthDate, role, location, password } = dto;
    const user = {
      email, avatar: '', birthDate: dayjs(birthDate).toDate(),
      passwordHash: '', name, gender, role, location, createdAt: dayjs().toDate(),
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
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new UserNotFoundException(id);
    }

    return existUser;
  }

  async loginUser(user: Pick<UserInterface, 'id' | 'email' | 'role' | 'name'>, refreshTokenId?: string) {
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
}
