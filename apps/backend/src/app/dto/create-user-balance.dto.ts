import { OrderType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateUserBalanceDto {
  @ApiProperty({
    description: 'Тип - абонемент или тренировка',
    example: 'Абонемент',
  })
  @IsEnum(OrderType)
  entityType: OrderType;

  @ApiProperty({
    description: 'Количество',
    example: 4
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  entityCount: number;
}
