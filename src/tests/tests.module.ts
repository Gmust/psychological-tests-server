import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from '../schemas/test.schema';
import { Test } from '@nestjs/testing';
import { Question, QuestionSchema } from '../schemas/question.schema';
import { Answer, AnswerSchema } from '../schemas/answer.schema';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: TestSchema, name: Test.name },
      { schema: QuestionSchema, name: Question.name },
      { schema: AnswerSchema, name: Answer.name },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [TestsService, { provide: APP_GUARD, useClass: RolesGuard }],
  controllers: [TestsController],
})
export class TestsModule {
}
