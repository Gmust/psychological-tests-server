import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  email;

  @IsNotEmpty()
  password;
}