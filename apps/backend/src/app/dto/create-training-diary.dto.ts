import { TrainingDuration } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNumber, ValidateNested } from 'class-validator';

class TrainingEntryDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  trainingId: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  caloriesLoss: number;

  @IsEnum(TrainingDuration)
  trainingDuration: TrainingDuration;

  @Transform(({value}) => new Date(value))
  @IsDate()
  dateTraining: Date;
}

export class CreateTrainingDiaryDto {
  @ApiProperty({
    description: 'Дневник тренировок',
    example: '',
  })
  @ValidateNested({ each: true })
  @Type(() => TrainingEntryDto)
  @ValidateNested()
  @IsArray()
  diary: TrainingEntryDto[];
}
