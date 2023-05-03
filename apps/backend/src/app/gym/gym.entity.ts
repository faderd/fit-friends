import { EntityInterface } from '@fit-friends/core';
import { GymInterface, GymOption, UserLocation } from '@fit-friends/shared-types';

export class GymEntity implements EntityInterface<GymEntity>, GymInterface {
  public id?: number;
  public name: string;
  public location: UserLocation;
  public isVerified: boolean;
  public options: GymOption[];
  public photos: string[];
  public description: string;
  public price: number;
  public createdAt: Date;

  constructor(gym: GymInterface) {
    this.fillEntity(gym);
  }

  public toObject(): GymEntity {
    return { ...this };
  }

  public fillEntity(gym: GymInterface) {
    this.id = gym.id;
    this.name = gym.name;
    this.location = gym.location;
    this.isVerified = gym.isVerified;
    this.options = gym.options;
    this.photos = gym.photos;
    this.description = gym.description;
    this.price = gym.price;
    this.createdAt = gym.createdAt;
  }
}
