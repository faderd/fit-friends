import { GymOption, UserLocation } from '@fit-friends/shared-types';

export class CreateGymDto {
  public name: string;
  public location: UserLocation;
  public isVerified: boolean;
  public options: GymOption[];
  public photos: string[];
  public description: string;
  public price: number;
}
