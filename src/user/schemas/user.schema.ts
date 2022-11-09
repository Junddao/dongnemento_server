import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: ObjectId;

  @Prop()
  fbUid: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  social: string;

  @Prop()
  name: string;

  @Prop()
  introduce: string;

  @Prop()
  profileImage: string;

  @Prop()
  pushEnabled: boolean;

  @Prop()
  lat: number | null;

  @Prop()
  lng: number | null;

  @Prop()
  address: string | null;

  @Prop()
  status: string;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
