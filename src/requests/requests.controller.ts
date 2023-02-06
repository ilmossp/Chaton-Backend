import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, Request } from '@prisma/client';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';
import { UserService } from 'src/users/user.service';
import { RequestsService } from './requests.service';

@Controller('/user/:user/requests/')
export class RequestsController {
  constructor(
    private readonly requestService: RequestsService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(200)
  @Get(':id')
  async getRequestsById(@Param('id') id: number): Promise<Request[]> {
    const requests = await this.requestService.requests({
      where: { id, accepted: false },
    });
    return requests;
  }

  @HttpCode(200)
  @Post(':to')
  async sendRequest(@Param('user') user: number, @Param('to') to: number) {
    const request = await this.requestService.createRequest({
      from: { connect: { id: Number(user) } },
      to: { connect: { id: Number(to) } },
    });
    return request;
  }

  @HttpCode(200)
  @Post('accept/:id')
  async accept(@Param('id') id: number) {
    const request = await this.requestService.updateRequest({
      where: { id: Number(id) },
      data: { accepted: true },
    });
    return request;
  }
}
