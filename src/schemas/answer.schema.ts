import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type AnswerDocument = Answer & Document


@Schema()
export class Answer {

  @Prop({
    type: String,
    required: [true, 'Answer is required'],
  })
  answerText;

  @Prop({
    type: Number,
    required: [true, 'Points  are required'],
  })
  pointsForAnswer;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);