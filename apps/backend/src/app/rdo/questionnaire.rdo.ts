import { TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QuestionnaireRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор',
    example: '11'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя',
    example: 'Новичек'
  })
  @Expose()
  public trainingLevel: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировок',
    example: '[\'Бег\', \'Силовые\']'
  })
  @Expose()
  public trainingTypes: TrainingType[];

  @ApiProperty({
    description: 'Флаг готовности к роведению тренировки',
    example: true
  })
  @Expose()
  public isReadyToTrain: boolean;

  @ApiProperty({
    description: 'Время на тренировку, указывается в интервалах',
    example: '10-30'
  })
  @Expose()
  public trainingDuration: TrainingDuration;

  @ApiProperty({
    description: 'Количество калорий для сброса',
    example: 4000
  })
  @Expose()
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день',
    example: 1000
  })
  @Expose()
  public burnsCaloriesPerDay: number;

  @ApiProperty({
    description: 'Сертификат тренера, pdf-файл',
  })
  @Expose()
  public certificate: string;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера',
    example: 'Какой-то текст.'
  })
  @Expose()
  public merits: string;
}
