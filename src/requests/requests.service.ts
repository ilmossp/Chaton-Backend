import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async request(requestWhereUniqueInput: Prisma.RequestWhereUniqueInput) {
    try {
      return this.prisma.request.findUnique({
        where: requestWhereUniqueInput,
      });
    } catch (error) {
      throw new HttpException('internal server error', 500);
    }
  }

  async requests(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RequestWhereUniqueInput;
    where?: Prisma.RequestWhereInput;
    orderBy?: Prisma.RequestOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.request.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRequest(data: Prisma.RequestCreateInput) {
    try {
      return this.prisma.request.create({ data });
    } catch (error) {
      throw new HttpException('internal server error', 500);
    }
  }

  async updateRequest(params: {
    where: Prisma.RequestWhereUniqueInput;
    data: Prisma.RequestUpdateInput;
  }) {
    try {
      const { where, data } = params;
      return this.prisma.request.update({ where, data });
    } catch (error) {
      throw new HttpException('internal server error', 500);
    }
  }

  async sendRequest(from: number, to: number) {
    return this.prisma.request.create({
      data: {
        from: { connect: { id: from } },
        to: { connect: { id: to } },
      },
    });
  }

  async acceptRequest(id: number) {
    return this.prisma.request.update({
      where: { id },
      data: { accepted: true },
    });
  }

  async deleteRequest(where: Prisma.RequestWhereUniqueInput) {
    try {
      return this.prisma.request.delete({ where });
    } catch (error) {
      throw new HttpException('internal server error', 500);
    }
  }
}
