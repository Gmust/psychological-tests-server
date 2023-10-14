import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Answer } from '../../schemas/answer.schema';

export class CreateQuestionDto {

  @IsNotEmpty()
  questionText;

  @IsNotEmpty()
  @ValidateNested()
  answers: Answer[];

}