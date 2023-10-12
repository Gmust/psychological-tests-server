import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import * as process from 'process';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async generateAccessToken(user: User) {
    return {
      access_token: this.jwtService.sign({ user }),
    };
  }

  async generateRefreshToken(userId: string) {
    return {
      refresh_token: this.jwtService.sign({ userId }, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async parseJwt(token: string) {
    const t = String(token);
    return JSON.parse(Buffer.from(t.split('.')[1], 'base64').toString());
  }

  async getUserByTokenData(token: string) {
    const parsed = await this.parseJwt(token);
    return this.userService.findUserByEmail(parsed.user.email);
  }

}
