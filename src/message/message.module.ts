import { Module } from '@nestjs/common';
import { PrismModule } from 'src/prisma-service/prisma.module';

import { MessageService } from './message.service';

@Module({
    imports: [PrismModule],
    providers:[MessageService],
    exports: [MessageService]
})
export class MessageModule {}
