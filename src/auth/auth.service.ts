import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';
import CreateUserDto from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService) { }

  async registerUser(registrationData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const user = await this.UserService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
      user.password = undefined;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new HttpException(
            'user already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new HttpException(
        'an internal error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.UserService.user({ email: email });
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.UserService.user({ userName: username });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
