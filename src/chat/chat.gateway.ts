import { Logger, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';

@WebSocketGateway()
@UseGuards(CookieAuthenticationGuard)
export class ChatGateway implements OnGatewayConnection {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    this.logger.debug('New connection');
    socket.emit('connection', 'Successfully connected to server');
  }

  @SubscribeMessage('message')
  messageHandler(@MessageBody() message: string): string {
    this.logger.debug(`New message: ${message}`);
    return message;
  }
}