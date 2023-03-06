import { Gender, UserLocation, UserRole } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'Уникальный id пользователя',
    example: '11'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@domain.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'http://domain.com/upload/111.jpg'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Пол пользователя',
    example: 'мужчина'
  })
  @Expose()
  public gender: Gender;

  @ApiProperty({
    description: 'Дата рождения',
    example: '2023-03-05T17:14:13.362Z'
  })
  @Expose()
  public birthDate: Date;

  @ApiProperty({
    description: 'Роль пользователя в системе',
    example: 'trainer'
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Станция метро',
    example: 'Пионерская'
  })
  @Expose()
  public location: UserLocation;

  @ApiProperty({
    description: 'Дата создания пользователя',
    example: '2023-03-05T17:14:13.362Z'
  })
  @Expose()
  public createdAt: Date;
}
