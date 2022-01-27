import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NewContentDocument = NewContent & Document;

@Schema()
export class NewContent {
  @Prop([String])
  filePath: string;
  @Prop([String])
  status: string;
  @Prop([Date])
  created_at: Date;
  @Prop([Date])
  updated_at: Date;
  @Prop([Date])
  deleted_at: Date;
  @Prop([String])
  uuid: string;
  @Prop([String])
  platform_id = '1';
}

export const NewContentSchema = SchemaFactory.createForClass(NewContent);
