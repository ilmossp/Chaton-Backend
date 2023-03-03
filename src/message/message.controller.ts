import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
constructor(private readonly messageService: MessageService){}

@Get(":user")
async getMessagesByUser(@Param('user') user: number){
    try {
        const messages = this.messageService.getMessagesByUserID(user)
        return messages
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2001'){
                throw new HttpException('provided userID is invalid',HttpStatus.BAD_REQUEST)
            }
        }
        throw new HttpException('unknown error',HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

}
