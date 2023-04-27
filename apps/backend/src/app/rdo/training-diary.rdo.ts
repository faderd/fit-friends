import { TrainingDiaryItem } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class TrainingDiaryRdo {
  @Expose()
  public id: number;

  @Expose()
  public userId: number;

  @Expose()
  public diary: TrainingDiaryItem[];
}
