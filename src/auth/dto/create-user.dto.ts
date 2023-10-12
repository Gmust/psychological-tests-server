import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  username;

  @IsNotEmpty()
  @IsEmail()
  email;

  @IsNotEmpty()
  @IsStrongPassword()
  password;

}