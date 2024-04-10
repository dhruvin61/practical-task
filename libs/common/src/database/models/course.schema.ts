import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamps } from '@app/common/database/models/common.schema';
import mongoose from 'mongoose';
import { Lesson } from './lesson.schema';


@Schema({ versionKey: false })
export class Course extends Timestamps {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] })
  lessons?: Lesson[] = [];

  // @Prop({ type: [{ type: String, enum: UserRoles }], default: [UserRoles.User] })
  // lessons: Lesson[] = [UserRoles.User];
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
  })
  creatorId?: mongoose.Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);