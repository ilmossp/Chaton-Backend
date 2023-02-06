import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [UserModule],
  providers: [RequestsService],
  controllers: [RequestsController]
})
export class RequestsModule {}
