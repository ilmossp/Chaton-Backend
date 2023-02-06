import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

  @Get('')
  @UseGuards(CookieAuthenticationGuard)
  async getRequeststoUser(@Param('id') id: number): Promise<Request[]> {
    const requests = await this.requestService.requests({
      where: { id, accepted: false },
    });
    return requests;
  }

  @Post(':to')
  @UseGuards(CookieAuthenticationGuard)
  async sendRequest(@Param('user') userId: number, @Param('to') toId: number) {
    const request = await this.requestService.createRequest({
      from: { connect: { id: Number(userId) } },
      to: { connect: { id: Number(toId) } },
    });
    return request;
  }
}
