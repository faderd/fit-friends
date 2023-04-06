import { UserInterface } from './user.interface';

export interface ReviewInterface {
  id?: number;
  userId?: number;
  author?: UserInterface;
  trainingId: number;
  rate: number;
  text: string;
  createdAt: Date;
}
