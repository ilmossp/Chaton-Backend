import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';

@WebSocketGateway()
@UseGuards(CookieAuthenticationGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server
  handleConnect(){
    
  }
  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: string) {
    this.server.emit('receive_message',data);
  }
}
