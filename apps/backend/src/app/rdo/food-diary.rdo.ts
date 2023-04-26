import { FoodDiaryItem } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class FoodDiaryRdo {
  @Expose()
  public id: number;

  @Expose()
  public userId: number;

  @Expose()
  public diary: FoodDiaryItem[];
}
