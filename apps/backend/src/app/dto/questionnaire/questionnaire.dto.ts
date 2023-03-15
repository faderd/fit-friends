import { MAX_TRAINING_TYPE_LENGTH, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsBoolean, IsEnum } from 'class-validator';
import { CoachQuestionnaireDto } from './coach-questionnaire.dto';
import { UserQuestionnaireDto } from './user-questionnaire.dto';

export class QuestionnaireDtoBase {
  @ApiProperty({
    description: 'Уровень физической подготовки пользователя',
    example: 'Новичек'
  })
  @IsEnum(TrainingLevel)
  public trainingLevel: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировок',
    example: '[\'Бег\', \'Силовые\']'
  })
  @IsEnum([TrainingType])
  @ArrayMaxSize(MAX_TRAINING_TYPE_LENGTH, { message: `Максимум может быть: ${MAX_TRAINING_TYPE_LENGTH}` })
  public trainingTypes: TrainingType[];

  @ApiProperty({
    description: 'Флаг готовности к роведению тренировки',
    example: true
  })
  @IsBoolean()
  public isReadyToTrain: boolean;
}

export type QuestionnaireDto = UserQuestionnaireDto | CoachQuestionnaireDto;
