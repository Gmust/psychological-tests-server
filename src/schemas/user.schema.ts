import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import validator from "validator";

export type UserDocument = User & Document

@Schema()
export class User {

  @Prop({
    type: String,
    isRequired: [true, "Field name is required!"],
    validate: {
      validator: (val) => validator.isAlpha(val, "en-US", { ignore: "" })
    }
  })
  username;

  @Prop({
    type: String,
    isRequired: [true, "Field email is required"],
    validate: {
      validator: (val) => validator.isEmail(val)
    }
  })
  email;

  @Prop({
    type: String,
    enum: ["user", "admin"],
    default: "user"
  })
  role;

  @Prop({
    type: String,
    minlength: [4, "Password must be at least of 4 symbols"],
    validate: {
      validator: (val) => validator.isStrongPassword(val, {
        minUppercase: 1,
        minLength: 4,
        minNumbers: 1,
        minSymbols: 1
      })
    }
  })
  password;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: "Test" }],
    default: []
  })
  passedTests: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
