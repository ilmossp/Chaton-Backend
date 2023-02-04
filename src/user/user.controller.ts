import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.UserService.user({ id: Number(id) });
  }

  @Post()
  async registerUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.UserService.createUser(userData);
  }

  @Patch()
  async updateUser(@Body() userData: UpdateUserDto):Promise<User>{
    return this.UserService.updateUser(userData)
  }

}
