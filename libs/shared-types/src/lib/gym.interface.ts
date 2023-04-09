import { GymOption } from './gym-option.enum';
import { UserLocation } from './user-location.enum';

export interface GymInterface {
  id?: number;
  name: string;
  location: UserLocation;
  isVerified: boolean;
  options: GymOption[];
  photos: string[];
  description: string;
  price: number;
  createdAt: Date;
}
