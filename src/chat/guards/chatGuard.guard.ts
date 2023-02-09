import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class chatGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const data = context.switchToWs().getData();
    try{
        return data
    }catch(error){
        throw new WsException("you must be logged in to chat")
    }
  }
}