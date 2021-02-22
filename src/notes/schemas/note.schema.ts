import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;


}

export const NoteSchema = SchemaFactory.createForClass(Note);
