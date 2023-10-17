import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { Test } from '../schemas/test.schema';
import { Question } from '../schemas/question.schema';
import { Answer } from '../schemas/answer.schema';
import { CreateTestDto } from './dto/create-test.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { transaction } from '../utils/transaction';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestsService {

  constructor(
    @InjectModel(Test.name) private testModel: Model<Test>,
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
    @InjectConnection() private connection: Connection,
  ) {
  }

  async createQuestions(createQuestionDto: CreateQuestionDto[]): Promise<Question[]> {
    return Promise.all(createQuestionDto.map(async (question) => {
        const answers = await this.answerModel.create(question.answers.map((answer) => {
          return {
            answerText: answer.answerText,
            pointsForAnswer: answer.pointsForAnswer,
          };
        }));
        return this.questionModel.create({
          questionText: question.questionText,
          answers: answers.map((answer) => answer._id),
        });
      }),
    );
  }

  async createTest(createTestDto: CreateTestDto): Promise<Test> {

    if (!createTestDto.title || !createTestDto.result || !createTestDto.points) {
      throw new HttpException('Provide all needed data!', HttpStatus.FORBIDDEN);
    }

    return transaction(this.connection, async session => {
      const questions = await this.createQuestions(createTestDto.questions);
      return await this.testModel.create({
        questions: questions,
        points: createTestDto.points,
        result: createTestDto.result,
        title: createTestDto.title,
      });
    });
  }

  async updateTest(updateTestDto: UpdateTestDto): Promise<Test> {

    let questions: Question[];

    if (updateTestDto.questions) {
      questions = await this.createQuestions(updateTestDto.questions);
    }

    const updatedTest = await this.testModel.findByIdAndUpdate(
      updateTestDto._id,
      {
        $set: {
          result: updateTestDto.result,
          title: updateTestDto.title,
          points: updateTestDto.points,
        },
        $push: {
          questions: questions,
        },
      },
    );

    return updatedTest;
  }

  async deleteTest(testId: string | ObjectId) {
    return transaction(this.connection, async session => {
      const test = await this.testModel.findById(testId);
      await Promise.all(test.questions.map(async (question) => {
        const q = await this.questionModel.findOne(question);
        await this.answerModel.deleteMany({
          _id: {
            $in: q.answers,
          },
        });
      }));
      await this.questionModel.deleteMany({
        _id: {
          $in: test.questions,
        },
      });
      await test.deleteOne();
      return;
    });
  }
}


