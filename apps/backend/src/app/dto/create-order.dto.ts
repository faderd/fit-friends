import { OrderType, PaymentMethod } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Тип заказа - абонемент или тренировка',
    example: 'Абонемент',
  })
  @IsEnum(OrderType)
  public type: OrderType;

  @ApiProperty({
    description: 'Цена',
    example: 1000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public price: number;

  @ApiProperty({
    description: 'Количество',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public count: number;

  @ApiProperty({
    description: 'Метод оплаты',
    example: 'Mir',
  })
  @IsEnum(PaymentMethod)
  public paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'id объекта',
    example: 1
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public entityId: number;
}
