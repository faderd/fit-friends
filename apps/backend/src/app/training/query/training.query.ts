import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../../app.constant';

export class TrainingQuery {
  @Transform(({ value }) => +value || DEFAULT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  public isOnlyFreeTrainings: boolean;

}
