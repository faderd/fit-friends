import { EMAIL_NOT_VALID } from '@fit-friends/core';
import { Gender, UserLocation, UserNameLengthRange, UserRole } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  @MinLength(UserNameLengthRange.Min, { message: `Минимальная длина имени: ${UserNameLengthRange.Min}` })
  @MaxLength(UserNameLengthRange.Max, { message: `Максимальная длина имени: ${UserNameLengthRange.Max}` })
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Адрес электронной почты',
    example: 'example@domain.com',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  @IsOptional()
  public email?: string;

  @ApiProperty({
    description: 'Пол',
    example: 'мужчина',
  })
  @IsEnum(Gender)
  @IsOptional()
  public gender?: Gender;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  public birthDate?: Date;

  @ApiProperty({
    description: 'Роль пользователя в системе',
    example: 'user',
  })
  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;

  @ApiProperty({
    description: 'Станция метро',
    example: 'Пионерская',
  })
  @IsEnum(UserLocation)
  @IsOptional()
  public location?: UserLocation;

  @ApiProperty({
    description: 'Список id друзей',
    example: '[1, 2, 3]'
  })
  public friends?: number[];
}
