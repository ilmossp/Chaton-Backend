import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { log } from 'console';
import { Server } from 'socket.io';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';

@WebSocketGateway(3001)
@UseGuards(CookieAuthenticationGuard)
export class ChatGateway implements OnModuleInit {
  
  private readonly logger = new Logger(ChatGateway.name);
  
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.server.emit("connected", "welcome back")
    });
  }


  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: string) {
    this.logger.log('message received: ' + data);
  }

}
