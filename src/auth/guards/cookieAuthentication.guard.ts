import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  
  logger:Logger = new Logger(CookieAuthenticationGuard.name)
  
  
  canActivate(context: ExecutionContext): boolean {
    const host = context.getType();
    if(host == "http"){
      const request = context.switchToHttp().getRequest();
      this.logger.debug('i am in cookie auth guard http')
      return request.isAuthenticated()
    }
    if(host=="ws"){
      const client: Socket = context.switchToWs().getClient();
      this.logger.debug('i am in cookie auth guard ws')
      return client.handshake.auth.isAuthenticated()
    }
  }
}
