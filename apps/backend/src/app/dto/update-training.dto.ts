import { CaloriesLossRange, Gender, MIN_TRAINING_PRICE, TrainingDescriptionLengthRange, TrainingDuration, TrainingLevel, TrainingNameLengthRange, TrainingType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Название тренировки',
    example: 'CROSSFIT',
  })
  @IsString()
  @MinLength(TrainingNameLengthRange.Min, { message: `Минимальная длина названия: ${TrainingNameLengthRange.Min}` })
  @MaxLength(TrainingNameLengthRange.Max, { message: `Максимальная длина названия: ${TrainingNameLengthRange.Max}` })
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Картинка тренировки',
  })
  @IsOptional()
  public backgroundImage?: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя',
    example: 'Новичек'
  })
  @IsEnum(TrainingLevel)
  @IsOptional()
  public level?: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировок',
    example: 'Бег'
  })
  @IsEnum(TrainingType)
  @IsOptional()
  public type?: TrainingType;

  @ApiProperty({
    description: 'Время на тренировку, указывается в интервалах',
    example: '10-30'
  })
  @IsEnum(TrainingDuration)
  @IsOptional()
  public trainingDuration?: TrainingDuration;

  @ApiProperty({
    description: 'Цена',
    example: 1000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(MIN_TRAINING_PRICE, { message: `Минимальное значение: ${MIN_TRAINING_PRICE}` })
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Количество калорий для сброса',
    example: 4000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(CaloriesLossRange.Min, { message: `Минимальное значение: ${CaloriesLossRange.Min}` })
  @Max(CaloriesLossRange.Max, { message: `Максимальное значение: ${CaloriesLossRange.Max}` })
  @IsOptional()
  public calories?: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.'
  })
  @IsString()
  @MinLength(TrainingDescriptionLengthRange.Min, { message: `Минимальная длина названия: ${TrainingDescriptionLengthRange.Min}` })
  @MaxLength(TrainingDescriptionLengthRange.Max, { message: `Максимальная длина названия: ${TrainingDescriptionLengthRange.Max}` })
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Пол',
    example: 'мужчина',
  })
  @IsEnum(Gender)
  @IsOptional()
  public gender?: Gender;

  @ApiProperty({
    description: 'Видео тренировки',
    example: '',
  })
  @IsOptional()
  public video?: string;

  @ApiProperty({
    description: 'Признак специального предложения',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  public isSpecialOffer?: boolean;

  // public rate?: number;
}
