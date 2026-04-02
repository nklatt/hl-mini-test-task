import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ModulesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByCourse(courseId: number) {
    return this.prismaService.modules.findMany({
      where: { course_id: courseId },
      orderBy: { order: "asc" },
    });
  }

  async findById(courseId: number, moduleId: number) {
    return this.prismaService.modules.findUniqueOrThrow({
      where: { id: moduleId, course_id: courseId },
      include: {
        cards: { orderBy: { order: "asc" } },
      },
    });
  }

  async create(courseId: number, title: string, order: number) {
    return this.prismaService.modules.create({
      data: { title, order, course_id: courseId },
    });
  }

  async update(
    courseId: number,
    moduleId: number,
    title?: string,
    order?: number,
  ) {
    return this.prismaService.modules.update({
      where: { id: moduleId, course_id: courseId },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(order !== undefined ? { order } : {}),
      },
    });
  }

  async delete(courseId: number, moduleId: number) {
    return this.prismaService.modules.delete({
      where: { id: moduleId, course_id: courseId },
    });
  }
}
