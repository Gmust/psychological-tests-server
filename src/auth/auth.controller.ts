import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginGuard } from './guards/login.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
  }

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {

    } catch (e) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: e
      });
    }
  }

}
