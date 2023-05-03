import { OrderType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserBalanceDto {
  @ApiProperty({
    description: 'Тип - абонемент или тренировка',
    example: 'Абонемент',
  })
  @IsEnum(OrderType)
  @IsOptional()
  entityType: OrderType;

  @ApiProperty({
    description: 'Количество',
    example: 4
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  entityCount: number;
}
