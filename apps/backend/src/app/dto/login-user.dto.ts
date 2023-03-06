import { EMAIL_NOT_VALID } from '@fit-friends/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsEmail } from 'class-validator/types/decorator/decorators';

export class LoginUserDto {
  @ApiProperty({
    description: 'Уникальный email пользователя',
    example: 'user@user.ru',
  })
  @IsEmail({}, {message: EMAIL_NOT_VALID})
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456'
  })
  @IsString()
  @Expose()
  password: string;
}
