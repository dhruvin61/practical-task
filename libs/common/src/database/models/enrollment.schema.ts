import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Timestamps } from '@app/common/database/models/common.schema';
import mongoose, { ObjectId } from 'mongoose';

@Schema({ id: true, versionKey: false })
export class Enrollment extends Timestamps {

  @Prop({ type: mongoose.Types.ObjectId, required:true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, required:true })
  courseId: mongoose.Types.ObjectId;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
