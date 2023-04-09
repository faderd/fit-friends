import { GymOption, UserLocation } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class GymRdo {
  @Expose()
  public id?: number;

  @Expose()
  public name: string;

  @Expose()
  public location: UserLocation;

  @Expose()
  public isVerified: boolean;

  @Expose()
  public options: GymOption[];

  @Expose()
  public photos: string[];

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public createdAt: Date;
}
