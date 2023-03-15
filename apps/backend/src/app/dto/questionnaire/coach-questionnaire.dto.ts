import { CoachMeritsLengthRange } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';
import { QuestionnaireDtoBase } from './questionnaire.dto';

export class CoachQuestionnaireDto extends QuestionnaireDtoBase {
  @ApiProperty({
    description: 'Сертификат тренера, pdf-файл',
  })
  public certificate: string;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера',
    example: 'Какой-то текст.'
  })
  @IsString()
  @MinLength(CoachMeritsLengthRange.Min, { message: `Минимальная длина текста: ${CoachMeritsLengthRange.Min}` })
  @MaxLength(CoachMeritsLengthRange.Max, { message: `Максимальная длина текста: ${CoachMeritsLengthRange.Max}` })
  public merits: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки',
    example: true
  })
  @IsBoolean()
  public isReadyToTrain: boolean;
}
