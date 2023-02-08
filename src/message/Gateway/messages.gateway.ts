import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateWay {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    return data;
  }
}
