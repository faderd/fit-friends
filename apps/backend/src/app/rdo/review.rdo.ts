import { UserInterface } from '@fit-friends/shared-types';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @Expose()
  public id: number;

  @Expose()
  public author: UserInterface;

  @Expose()
  public trainingId: number;

  @Expose()
  public rate: number;

  @Expose()
  public text: string;

  @Expose()
  public createdAt: Date;
}
