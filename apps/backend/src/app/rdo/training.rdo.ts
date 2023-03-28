import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class TrainingRdo {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public backgroundImage: string;

  @Expose()
  public level: TrainingLevel;

  @Expose()
  public type: TrainingType;

  @Expose()
  public trainingDuration: TrainingDuration;

  @Expose()
  public price: number;

  @Expose()
  public calories: number;

  @Expose()
  public description: string;

  @Expose()
  public gender: Gender;

  @Expose()
  public video: string;

  @Expose()
  public rate: number;

  @Expose()
  public userId: number;

  @Expose()
  public isSpecialOffer: boolean;
}
