import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

@Schema({ timestamps: true })
export class Timestamps extends AbstractDocument {
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;

  @Prop({ type: Date, default: null })
  isDeleted?: Date;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const TimestampSchema = SchemaFactory.createForClass(Timestamps);
