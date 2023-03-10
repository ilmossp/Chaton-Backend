import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';
import { RequestsService } from './requests.service';

@Controller('/user/:user/requests/')
@UseGuards(CookieAuthenticationGuard)
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}

  @HttpCode(200)
  @Get(':id')
  async getRequestsByUserId(@Param('id') id: number) {
    const requests = await this.requestService.requests({
      where: { id, accepted: false },
    });
    return requests;
  }

  @HttpCode(200)
  @Post(':to')
  async sendRequest(@Param('user') user: number, @Param('to') to: number) {
    const request = await this.requestService.sendRequest(user, to);
    return request;
  }

  @HttpCode(200)
  @Post('accept/:id')
  async accept(@Param('id') id: number) {
    const request = await this.requestService.acceptRequest(id);
    return request;
  }
}
