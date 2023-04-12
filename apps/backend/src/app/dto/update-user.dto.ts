import { Gender, UserLocation, UserNameLengthRange } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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

  @ApiProperty({
    description: 'Список id избранных залов',
    example: '[1, 2, 3]'
  })
  public myFavoriteGyms?: number[];
}
