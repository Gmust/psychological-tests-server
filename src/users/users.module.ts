import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { TestSchema } from '../schemas/test.schema';
import { Test } from '@nestjs/testing';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('findOne', async function(next) {
            this.populate('passedTests', 'resultPoints, resultText, test');
          });
          schema.pre('save', async function(next) {
            if (!this.password) throw new HttpException('Error', HttpStatus.BAD_REQUEST);
            this.password = await bcrypt.hash(this.password, 12);
          });
        },
      },
    ]),
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: TestSchema, name: Test.name },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
}
