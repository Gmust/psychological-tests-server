import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type ResultDocument = Result & Document

@Schema()
export class Result {

  @Prop({
    type: Number,
    required: [true, 'Result points required'],
  })
  resultPoints;

  @Prop({
    type: String,
    required: [true, 'Result text required'],
  })
  resultText;

  @Prop({
    type: { type: MongooseSchema.Types.ObjectId, ref: 'Test' },
  })
  test;
}

export const ResultSchema = SchemaFactory.createForClass(Result);