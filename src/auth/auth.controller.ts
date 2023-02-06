import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegistrateUserDto from './dto/registrateUser.dto';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { Response as ExpressResponse } from "express";
import { CookieAuthenticationGuard } from './guards/cookieAuthentication.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegistrateUserDto) {
    return this.AuthService.registerUser(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('logout')
  async logout(
    @Request() request: RequestWithUser,
    @Response() response: ExpressResponse,
  ) {
    //@ts-ignore
    request.logout(request.user, (err, next) => {
      if (err) next(err);
      response.json({ message: 'Logged out successfully' });
    });
  }
}
