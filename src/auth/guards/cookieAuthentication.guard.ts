import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const host = context.getType();
    if(host == "http"){
      const request = context.switchToHttp().getRequest();
      return request.isAuthenticated()
    }
    if(host=="ws"){
      const data = context.switchToWs().getData()
      console.log(data)
    }
  }
}
