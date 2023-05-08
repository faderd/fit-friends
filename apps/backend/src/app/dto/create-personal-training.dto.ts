import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreatePersonalTrainingDto {
  @ApiProperty({
    description: 'id пользователя',
    example: 4000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public targetUserId: number;
}
