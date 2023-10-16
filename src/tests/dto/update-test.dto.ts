import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Question } from '../../schemas/question.schema';

export class UpdateTestDto {

  @IsNotEmpty()
  _id;

  @IsString()
  title;

  @IsArray()
  @ValidateNested()
  questions: Question[];

  @IsNumber()
  points;

  @IsString()
  result;
}