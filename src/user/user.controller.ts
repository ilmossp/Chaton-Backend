import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { json } from 'node:stream/consumers';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService){}

    @Get(":id")
    async getUserById(@Param("id") id: number): Promise<User>{
        return this.UserService.user({id: Number(id) })
    }

    @Post()
    async registerUser(@Body() userData: {userName: string;email: string}): Promise<User>{
        
        return this.UserService.createUser(userData)
        
    }
}
