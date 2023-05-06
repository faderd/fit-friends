import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubscriberInterface } from '@readme/shared-types';

@Schema({
  collection: 'email-subscriber',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  public userId: string;

  @Prop()
  public email: string;

  @Prop()
  public firstname: string;

  @Prop()
  public lastname: string;

  @Prop()
  public newPosts: string[];
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
