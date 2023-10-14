import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Question } from '../../schemas/question.schema';

export class CreateTestDto {

  @IsNotEmpty()
  title;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  questions: Question[];

  @IsNotEmpty()
  @IsNumber()
  points;

  @IsNotEmpty()
  result;
}