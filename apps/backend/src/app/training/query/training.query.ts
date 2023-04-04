import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_SORT_DIRECTION, DEFAULT_TRAINING_COUNT_LIMIT } from '../training.const';

export class TrainingQuery {
  @Transform(({ value }) => +value || DEFAULT_TRAINING_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TRAINING_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  public isOnlyFreeTrainings: boolean;

}
