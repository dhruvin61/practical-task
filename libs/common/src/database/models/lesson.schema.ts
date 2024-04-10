import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamps } from '@app/common/database/models/common.schema';
import mongoose from 'mongoose';

@Schema({ id: true, versionKey: false })
export class Lesson extends Timestamps {
  @Prop({ type: String, required: true })
  fileUrl: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
  })
  creatorId: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
  })
  courseId: mongoose.Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
