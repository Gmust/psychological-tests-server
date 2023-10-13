import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginGuard } from './guards/login.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
  }

  @UseGuards(LoginGuard)
  @Post('login')
  @HttpCode(201)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.login(loginUserDto);
      const access_token = await this.authService.generateAccessToken(user);
      const refresh_token = await this.authService.generateRefreshToken(String(user._id));

      return {
        ...access_token,
        ...refresh_token,
        user,
      };

    } catch (e) {
      console.log(e)
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error occured',
      }, HttpStatus.FORBIDDEN, {
        cause: e,
      });
    }
  }

  @Post('register')
  @HttpCode(201)
  async registrateUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.registration(createUserDto);
      return {
        msg: 'User successfully registered!',
      };
    } catch (e) {
      if (e.name === 'ValidationError') {
        // @ts-ignore
        const message = Object.values(e.errors).map(value => value.message);
        console.log(message);
        throw  new BadRequestException('Error occurred', { cause: new Error(), description: message[0] });
      }
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error occured',
      }, HttpStatus.FORBIDDEN, {
        cause: e,
      });
    }
  }


}
