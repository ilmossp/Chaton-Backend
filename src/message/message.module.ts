import { Module } from '@nestjs/common';
import { MessageGateWay } from './Gateway/messages.gateway';
import { MessageService } from './message.service';

@Module({
    providers:[MessageService,MessageGateWay]
})
export class MessageModule {}
