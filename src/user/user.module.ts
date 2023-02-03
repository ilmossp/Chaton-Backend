import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Module({
    imports: [PrismaService]
})
export class UserModule {}
