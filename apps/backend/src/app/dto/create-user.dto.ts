import { EMAIL_NOT_VALID } from '@fit-friends/core';
import { Gender, UserLocation, UserNameLengthRange, UserPasswordLengthRange, UserRole } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  @MinLength(UserNameLengthRange.Min, { message: `Минимальная длина имени: ${UserNameLengthRange.Min}` })
  @MaxLength(UserNameLengthRange.Max, { message: `Максимальная длина имени: ${UserNameLengthRange.Max}` })
  public name: string;

  @ApiProperty({
    description: 'Адрес электронной почты',
    example: 'example@domain.com',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'vb4ga6',
  })
  @IsString()
  @MinLength(UserPasswordLengthRange.Min, { message: `Минимальная длина пароля: ${UserPasswordLengthRange.Min}` })
  @MaxLength(UserPasswordLengthRange.Max, { message: `Максимальная длина пароля: ${UserPasswordLengthRange.Max}` })
  public password: string;

  @ApiProperty({
    description: 'Пол',
    example: '',
  })
  @IsEnum(Gender)
  public gender: Gender;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '',
  })
  @IsOptional()
  @IsDate()
  public birthDate: Date;

  @ApiProperty({
    description: 'Роль пользователя в системе',
    example: '',
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({
    description: 'Станция метро',
    example: '',
  })
  @IsEnum(UserLocation)
  public location: UserLocation;
}
