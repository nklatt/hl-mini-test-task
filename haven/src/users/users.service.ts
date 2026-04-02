import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    return this.prismaService.users.findUnique({ where: { id } });
  }

  async findByPhone(phone: string) {
    return this.prismaService.users.findUnique({ where: { phone } });
  }

  async findOrCreateByPhone(phone: string) {
    const existing = await this.findByPhone(phone);
    if (existing) {
      return existing;
    }

    return this.prismaService.users.create({
      data: { phone },
    });
  }

  async setName(userId: number, first: string, last: string) {
    return this.prismaService.users.update({
      where: { id: userId },
      data: { first, last },
    });
  }
}
