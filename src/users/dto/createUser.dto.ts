import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  userName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
