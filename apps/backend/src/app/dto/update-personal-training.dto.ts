import { StatusRequestTraining } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdatePersonalTrainingDto {
  @ApiProperty({
    description: 'Статус запроса на тренировку',
    example: 'Принят'
  })
  @IsEnum(StatusRequestTraining)
  public status: StatusRequestTraining;
}
