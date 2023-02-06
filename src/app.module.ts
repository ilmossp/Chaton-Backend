import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma-service/prisma.service';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { ConfigModule } from "@nestjs/config";
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MessageModule } from './message/message.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [AuthModule, UserModule, MessageModule,ConfigModule.forRoot({ isGlobal: true }), RequestsModule],
  controllers: [AppController, UserController, MessageController],
  providers: [AppService, PrismaService, UserService, MessageService],
})
export class AppModule {}
