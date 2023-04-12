import { TrainingInterface } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class CoachOrdersInfoRdo {
  @Expose()
  public training: TrainingInterface;

  @Expose()
  public trainingsCount: number;

  @Expose()
  public price: number;
}
