import { MealType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNumber, ValidateNested } from 'class-validator';

class MealEntryDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  caloriesCount: number;

  @Transform(({value}) => new Date(value))
  @IsDate()
  date: Date;

  @IsEnum(MealType)
  mealType: MealType;
}

export class UpdateFoodDiaryDto {
  @ApiProperty({
    description: 'Дневник питания',
    example: '',
  })
  @ValidateNested({ each: true })
  @Type(() => MealEntryDto)
  @ValidateNested()
  @IsArray()
  diary: MealEntryDto[];
}
