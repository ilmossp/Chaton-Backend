import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { UserModule } from 'src/users/user.module';
import { PrismModule } from 'src/prisma-service/prisma.module';

@Module({
  imports: [UserModule,PrismModule],
  providers: [RequestsService],
  controllers: [RequestsController]
})
export class RequestsModule {}
