import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Request } from '@prisma/client';
import { CookieAuthenticationGuard } from 'src/auth/guards/cookieAuthentication.guard';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestService: RequestsService) {}
  
  
  @Get(':user')
  @UseGuards(CookieAuthenticationGuard)
  async getRequeststoUser(@Param('id') id: number): Promise<Request[]> {
    const requests = await this.requestService.requests({where:{id,accepted:false}})
    return requests
  }

  @Post()
  @UseGuards(CookieAuthenticationGuard)
  async sendRequest(@Body())


}
