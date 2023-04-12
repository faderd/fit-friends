import { Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../../app.constant';
import { TrainingDuration } from '@fit-friends/shared-types';

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

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public minPrice: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public maxPrice: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public minCalories: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public maxCalories: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public minRate: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public maxRate: number;

  @Transform(({ value }) => value.split(';'))
  @IsOptional()
  public trainingDuration: TrainingDuration[];
}
