import { Expose } from 'class-transformer';

export class NotifyRdo {
  @Expose()
  public id: number;

  @Expose()
  public notificationDate: Date;

  @Expose()
  public userId: number;

  @Expose()
  public text: string;
}
