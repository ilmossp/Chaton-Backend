import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma-service/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, UserModule, MessageModule],
  controllers: [AppController, UserController, MessageController],
  providers: [AppService, PrismaService, UserService, MessageService],
})
export class AppModule {}
