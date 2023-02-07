import { Controller, Get, HttpCode, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('/user/:user/requests/')
export class RequestsController {
  constructor(
    private readonly requestService: RequestsService
  ) {}
  
  @HttpCode(200)
  @Get(':id')
  async getRequestsByUserId(@Param('id',ParseIntPipe) id: number) {
    const requests = await this.requestService.requests({
      where: { id, accepted: false },
    });
    return requests;
  }

  @HttpCode(200)
  @Post(':to')
  async sendRequest(@Param('user',ParseIntPipe) user: number, @Param('to',ParseIntPipe) to: number) {
    const request = await this.requestService.sendRequest(user, to);
    return request;
  }

  @HttpCode(200)
  @Post('accept/:id')
  async accept(@Param('id',ParseIntPipe) id: number) {
    const request = await this.requestService.acceptRequest(id);
    return request;
  }
}
