import { StatusRequestTraining } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class PersonalTrainingRdo {
  @Expose()
  public id: number;

  @Expose()
  public initiatorUserId: number;

  @Expose()
  public targetUserId: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public status: StatusRequestTraining;
}
