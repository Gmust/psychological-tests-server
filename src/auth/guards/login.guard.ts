import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private userService: UsersService) {
  }

  async canActivate(
    context: ExecutionContext,
    //@ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}