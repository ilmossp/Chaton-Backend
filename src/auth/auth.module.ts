import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './local.serializer';

@Module({
  imports: [UserModule,PassportModule],
  providers: [AuthService,LocalStrategy,LocalSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
