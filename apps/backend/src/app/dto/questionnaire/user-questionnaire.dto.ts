import { BurnsCaloriesPerDayRange, CaloriesLossRange, TrainingDuration } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { QuestionnaireDtoBase } from './questionnaire.dto';

export class UserQuestionnaireDto extends QuestionnaireDtoBase {
  @ApiProperty({
    description: 'Время на тренировку, указывается в интервалах',
    example: '10-30'
  })
  @IsEnum(TrainingDuration)
  public trainingDuration: TrainingDuration;

  @ApiProperty({
    description: 'Количество калорий для сброса',
    example: 4000
  })
  @IsNumber()
  @Min(CaloriesLossRange.Min, { message: `Минимальное значение: ${CaloriesLossRange.Min}` })
  @Max(CaloriesLossRange.Max, { message: `Максимальное значение: ${CaloriesLossRange.Max}` })
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день',
    example: 1000
  })
  @IsNumber()
  @Min(BurnsCaloriesPerDayRange.Min, { message: `Минимальное значение: ${BurnsCaloriesPerDayRange.Min}` })
  @Max(BurnsCaloriesPerDayRange.Max, { message: `Максимальное значение: ${BurnsCaloriesPerDayRange.Max}` })
  public burnsCaloriesPerDay: number;
}
