import { NotifyLengthRange } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNotifyDto {
  @ApiProperty({
    description: 'Id пользователя',
    example: 1000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public userId: number;

  @ApiProperty({
    description: 'Текст уведомления',
    example: 'Текст',
  })
  @IsString()
  @MinLength(NotifyLengthRange.Min, { message: `Минимальная длина текста: ${NotifyLengthRange.Min}` })
  @MaxLength(NotifyLengthRange.Max, { message: `Максимальная длина текста: ${NotifyLengthRange.Max}` })
  public text: string;
}

