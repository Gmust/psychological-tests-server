import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import validator from 'validator';

export type UserDocument = User & Document

@Schema()
export class User {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: String,
    isRequired: [true, 'Field name is required!'],
    validate: [validator.isAlpha, "Please enter a valid username" ]
  })
  username;

  @Prop({
    type: String,
    isRequired: [true, 'Field email is required'],
    validate: [validator.isEmail, "Please enter a valid E-mail!" ]
  })
  email;

  @Prop({
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role;

  @Prop({
    type: String,
    minlength: [4, 'Password must be at least of 4 symbols'],
    validate: {
      validator: (val) => validator.isStrongPassword(val, {
        minUppercase: 1,
        minLength: 4,
        minNumbers: 1,
        minSymbols: 1,
      }),
      message: 'Password must contain of: 1 special symbol, minimum 1 Uppercase letter and, at least, 1 number'
    },
  })
  password;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Test' }],
    default: [],
  })
  passedTests: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
