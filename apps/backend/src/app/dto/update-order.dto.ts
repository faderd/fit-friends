import { OrderType, PaymentMethod } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Тип заказа - абонемент или тренировка',
    example: 'Абонемент',
  })
  @IsEnum(OrderType)
  @IsOptional()
  public type?: OrderType;

  @ApiProperty({
    description: 'Цена',
    example: 1000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Количество',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public count?: number;

  @ApiProperty({
    description: 'Метод оплаты',
    example: 'Mir',
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  public paymentMethod?: PaymentMethod;

  @ApiProperty({
    description: 'id объекта',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public entityId?: number;
}
