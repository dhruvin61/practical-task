import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '@app/common/enums';
import { Timestamps } from '@app/common/database/models/common.schema';

@Schema({ id: true, versionKey: false })
export class User extends Timestamps {
  @Prop({ type: String, nullable: true })
  firstName?: string;

  @Prop({ type: String, nullable: true })
  lastName?: string;
  
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [{ type: String, enum: UserRoles }], default: [UserRoles.User] })
  roles: UserRoles[] = [UserRoles.User];
}

export const UserSchema = SchemaFactory.createForClass(User);
