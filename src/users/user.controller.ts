import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get(':id')
  @UseGuards(CookieAuthenticationGuard)
  async getUserById(@Param('id',ParseIntPipe) id: number): Promise<User> {
    return this.UserService.user({ id });
  }

  
  @Post()
  async registerUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.UserService.createUser(userData);
  }

  @Patch()
  async updateUser(@Body() userData: UpdateUserDto): Promise<User> {
    return this.UserService.updateUser({ where: userData, data: userData });
  }
}
