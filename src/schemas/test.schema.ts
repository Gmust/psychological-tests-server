import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type TestDocument = Test & Document

@Schema()
export class Test {

  @Prop({
    type: String,
    unique: [true, 'There are already test with this title'],
  })
  title;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Question' }],
    required: [true, 'Question is required'],
    minlength: [3, 'There must be at least 3 questions'],
  })
  questions: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: Number,
    required: [true, 'Test must amount of points'],
  })
  points;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Result' }],
    required: [true, 'Results must be provided'],
  })
  result;
}

export const TestSchema = SchemaFactory.createForClass(Test);






