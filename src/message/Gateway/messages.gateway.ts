import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class GateWay {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    return data;
  }
}
