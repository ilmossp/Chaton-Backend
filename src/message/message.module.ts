import { Module } from '@nestjs/common';
import { PrismModule } from 'src/prisma-service/prisma.module';
import { MessageGateWay } from './Gateway/messages.gateway';
import { MessageService } from './message.service';

@Module({
    imports: [PrismModule],
    providers:[MessageService,MessageGateWay]
})
export class MessageModule {}
