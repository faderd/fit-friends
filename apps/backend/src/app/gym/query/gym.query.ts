import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../../app.constant';
import { GymOption, UserLocation } from '@fit-friends/shared-types';

export class GymQuery {
  @Transform(({ value }) => value && (+value <= DEFAULT_COUNT_LIMIT) ? +value : DEFAULT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public minPrice: number;

  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public location: UserLocation[];

  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public options: GymOption[];
}
