import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.courses.findMany({
      orderBy: { created_at: "asc" },
    });
  }

  async findById(courseId: number) {
    return this.prismaService.courses.findUniqueOrThrow({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            cards: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
  }

  async create(title: string, description?: string) {
    return this.prismaService.courses.create({
      data: { title, description },
    });
  }

  async update(courseId: number, title?: string, description?: string) {
    const current = await this.prismaService.courses.findUniqueOrThrow({
      where: { id: courseId },
    });
    const data: { title?: string; description?: string } = {};
    if (title !== undefined && title !== current.title) data.title = title;
    if (description !== undefined && description !== current.description)
      data.description = description;
    if (Object.keys(data).length === 0) return current;
    return this.prismaService.courses.update({
      where: { id: courseId },
      data,
    });
  }
}
