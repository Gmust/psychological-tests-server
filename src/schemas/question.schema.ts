import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type QuestionDocument = Question & Document


@Schema()
export class Question {

  @Prop({
    type: String,
  })
  questionText;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Answer' }],
    required: [true, 'Answers are required'],
    minlength: [2, 'Question must have at least 2 answers'],
  })
  answers;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
