import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
  }

  async registration(createUserDto: CreateUserDto) {
    if (!createUserDto) throw new BadRequestException('Something bad happened', {
      cause: new Error(), description: 'Provide all needed data',
    });

    const isUserExists = await this.userModel.findOne({ email: createUserDto.email });
    if (isUserExists) throw  new HttpException('User already exists', HttpStatus.CONFLICT);

    const createdUser = await new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(loginUserDto: LoginUserDto) {
    if (!loginUserDto) throw new BadRequestException('Something bad happened', {
      cause: new Error(), description: 'Provide all needed data',
    });

    const user = await this.userModel.findOne({
      email: loginUserDto.email,
    });

    if (!user) throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);

    return user as User;
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
