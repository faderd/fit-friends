import { MealType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, ValidateNested } from 'class-validator';

class MealEntryDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  caloriesCount: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  day: number;

  @IsEnum(MealType)
  mealType: MealType;
}

export class CreateFoodDiaryDto {
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
