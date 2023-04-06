import { ReviewLengthRange, ReviewValueRange } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Id тренировки',
    example: 1000
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public trainingId: number;

  @ApiProperty({
    description: 'Оценка',
    example: 4
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(ReviewValueRange.Min, { message: `Минимальное значение: ${ReviewValueRange.Min}` })
  @Max(ReviewValueRange.Max, { message: `Максимальное значение: ${ReviewValueRange.Max}` })
  public rate: number;

  @ApiProperty({
    description: 'Текст отзыва',
    example: 'Текст',
  })
  @IsString()
  @MinLength( ReviewLengthRange.Min, { message: `Минимальная длина текста: ${ReviewLengthRange.Min}` })
  @MaxLength(ReviewLengthRange.Max, { message: `Максимальная длина текста: ${ReviewLengthRange.Max}` })
  public text: string;
}

