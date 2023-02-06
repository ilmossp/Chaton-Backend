import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async request(requestWhereUniqueInput: Prisma.RequestWhereUniqueInput) {
    const request = await this.prisma.request.findUnique({
      where: requestWhereUniqueInput,
    });
    return request;
  }
  async requests(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RequestWhereUniqueInput;
    where?: Prisma.RequestWhereInput;
    orderBy?: Prisma.RequestOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    const request = await this.prisma.request.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return request;
  }

  async createRequest(data: Prisma.RequestCreateInput) {
    const request = this.prisma.request.create({ data });
    return request;
  }

  async updateRequest(params: {
    where: Prisma.RequestWhereUniqueInput;
    data: Prisma.RequestUpdateInput;
  }) {
    const { where, data } = params;
    const request = this.prisma.request.update({ where, data });
    return request;
  }

  async deleteRequest(where: Prisma.RequestWhereUniqueInput) {
    return this.prisma.request.delete({ where });
  }
}
